const express = require('express');
const router = express.Router();
const Contact = require('../modals/Contact');
const { body, validationResult } = require('express-validator');

// validate the user input in contact form submission
const contactValidate = [
  body('name', 'Enter a valid name').isLength({ min: 2 }),
  body('email', 'Enter a valid email').isEmail(),
  body('message', 'Message must be atleast 5 characters').isLength({ min: 2 }),];


// function to save contact form info to database
const contactFormSubmitHandler = async (req, res) => {
  try {
    // extract contact form info from frontend
    const { name, email, message } = req.body;
    // if errors, return bad request error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // if no errors, create document using Contact schema 
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // save the document to database and return 201 success code.
    await newContact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    // log and return if any errors found
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

// Route for contact form submission.
router.post('/submit', contactValidate, contactFormSubmitHandler);

module.exports = router