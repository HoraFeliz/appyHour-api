const createError = require('http-errors');
const nodemailer = require('../config/mailer.config');
const User = require('../models/user.model');
const mongoose = require('mongoose')

module.exports.googleLogin = (req, res, next) => {
	const generateRandomPass = () => {
		const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let token = '';
		for (let i = 0; i < 15; i++) {
			token += characters[Math.floor(Math.random() * characters.length)];
		}
		return token;
	};

	const profile = req.body.profileObj;

	User.findOne({ email: profile.email }).then((user) => {
		if (user) {
			req.session.user = user;
			res.status(200).json(user);
		} else {
			const user = new User({
				email: profile.email,
				password: generateRandomPass(),
				name: profile.name,
				image: profile.imageUrl,
				activation: {
					active: true
				}
			});

			user
				.save()
				.then((user) => {
					req.session.user = user;
					res.status(200).json(user);
				})
				.catch((e) => createError(400, 'Wrong credentials'));
		}
	});
};

module.exports.login = (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw createError(400, 'User or password incorrect');
	}
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				throw createError(400, 'User or password incorrect');
			} else {
				return user.checkPassword(password).then((match) => {
					if (!match) {
						throw createError(400, 'User or password incorrect');
					} else {
						req.session.user = user;
						res.json(user);
					}
				});
			}
		})
		.catch((e) => next(e));
};

module.exports.logout = (req, res, next) => {
	req.session.destroy();
	res.status(204).json();
};

module.exports.create = (req, res, next) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password
  });

	user
		.save()
		.then((user) => {
			nodemailer.sendValidationEmail(user.email, user.activation.token);
			res.status(200).json();
		})
		.catch((error) => {
			if (error instanceof mongoose.Error.ValidationError) {
					throw createError(400, 'Wrong credentials');
			} else if (error.code === 11000) {
				// error when duplicated user
				res.status(400).send({
					message: 'User already exists'
				});
			} else {
				createError(400, error);
			}
		})
		.catch(next);
};

module.exports.activateUser = (req, res, next) => {
	User.findOne({ 'activation.token': req.params.token })
		.then((user) => {
			if (user) {
				user.activation.active = true;
				user
					.save()
					.then((user) => {
						res.redirect(process.env.URL_REDIRECT)
					})
					.catch((e) => createError(400, 'Account not activate'));
			} else {
				createError(400, 'Account not activate');
			}
		})
		.catch((e) => next);
};
