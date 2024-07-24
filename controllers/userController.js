import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ msg: 'User removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
