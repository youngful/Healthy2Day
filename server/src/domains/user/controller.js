require("dotenv").config();
const User = require("./model");
const Dish = require("../dish/model")
const DialyRate = require("../dialyRate/model")
const jwt = require("jsonwebtoken");


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "", phone: "", massage: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered";
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "That password is incorrect";
    }

    // duplicate email error
    if (err.code === 11000) {
        if (err.keyPattern.email) errors.email = "that email is already registered";
        if (err.keyPattern.phone) errors.phone = "that phone is already registered";
        return errors;
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.message === "dish save error") {
        errors.massage = "Dish already saved by the user";
    }

    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const secret = process.env.SECRET_TOKEN;
const createToken = (id, age = maxAge) => {
    return jwt.sign({ id }, secret, {
        expiresIn: age,
    });
};

module.exports.isJWTTokenValid = async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.status(400).json({ isValid: false, data: null });
            } else {
                const user = await User.findById(decodedToken.id);
                if (user)
                    res.status(200).json({ isValid: true, data: { email: user.email } });
                else res.status(400).json({ isValid: false, data: null });
            }
        });
    } else {
        res.status(400).json({ isValid: false, data: null });
    }
};

module.exports.get_user_info = async (req) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decodedToken = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decodedToken);
                    }
                });
            });

            const userId = decodedToken.id;
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    } else {
        return null;
    }
};

module.exports.get_info = async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const decodedToken = await new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decodedToken);
                    }
                });
            });

            const userId = decodedToken.id;
            const user = await User.findById(userId);

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};


module.exports.signup_get = (req, res) => {
    res.json({ message: "signup" });
};

module.exports.login_get = (req, res) => {
    res.json({ message: "login" });
};

module.exports.signup_post = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.create({ firstName, lastName, email, password });

        res.status(200).json({ message: "signed up" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
            maxAge: maxAge * 1000,
        });

        res.status(200).json({ token });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", {
        secure: true,
        httpOnly: true,
        sameSite: "None",
        maxAge: 1,
    });
    res.status(200).json({ message: "logout" });
};

module.exports.showUserDishes = async (req, res) => {
    const userId = await module.exports.get_user_info(req);

    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const dishes = user.savedDishes;
        res.status(200).json(dishes);

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.addSavedDishesToUser = async (req, res) => {
    const userId = await module.exports.get_user_info(req);
    const dishId = req.body.dish;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const dish = await Dish.findById(dishId);
        if (!dish) {
            throw new Error('Dish not found');
        }

        const isDishSaved = user.savedDishes.some(savedDish => savedDish.equals(dish._id));
        if (isDishSaved) {
            throw new Error('dish save error');
        }

        user.savedDishes.push(dish);
        await user.save();
        console.log('Saved dishes added to user successfully');
        res.status(200).json({ message: "dish saved" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.removeSavedDishesToUser = async (req, res) => {
    const userId = await module.exports.get_user_info(req);
    const dishId = req.body.dish;
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const index = user.savedDishes.findIndex(dish => dish._id.toString() === dishId);

        if (index === -1) {
            throw new Error('Dish not found');
        }
        user.savedDishes.splice(index, 1);

        await user.save();
        console.log('Saved dishes removed from user successfully');
        res.status(200).json({ message: "dish removed" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.setUserProperties = async (req, res) => {
    const { sex, age, weight, height, activity } = req.body;

    const userId = await module.exports.get_user_info(req);


    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.sex = sex;
        user.age = age;
        user.height = height;
        user.weight = weight;
        user.activityName = activity.name
        user.activityIndex = activity.index

        await user.save();

        const dialyRate = await calculateDialyRate(user);

        user.savedDialyRate = dialyRate;

        await user.save();

        res.status(200).json({ message: "user data updated" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

async function calculateDialyRate(user) {
    let kcal;

    if (user.sex === 'M') {
        kcal = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    } else {
        kcal = 10 * user.weight + 6.25 * user.height - 5 * user.age - 161;
    }

    const TDEE = kcal * user.activityIndex;

    const protein = 0.3 * TDEE / 4
    const carbohydrate = 0.4 * TDEE / 4
    const lipid = 0.3 * TDEE / 9

    const dialyRate = new DialyRate({ kcal: TDEE, protein, carbohydrate, lipid })

    return dialyRate;

}