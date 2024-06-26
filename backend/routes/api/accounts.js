// backend/routes/api/accounts.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Account, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { body, validationResult, query } = require("express-validator");

const router = express.Router();

// Find Account by id
router.get('/company/:accountId', async (req, res, next) => {
    const accountId = req.params.accountId;
console.log("In Find Account")
    try {
      const account = await Account.findByPk(req.params.accountId);
      if (!account) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }

      res.status(200).json(account);
    } catch (error) {
      console.error('Error fetching account:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Update Account
  router.put('/company/:accountId', requireAuth, async (req, res, next) => {
    const accountId = req.params.accountId;
    const updatedAccountData = req.body; // Ensure that req.body only contains fields you want to update
  
    try {
      const rowsUpdated = await Account.update(updatedAccountData, {
        where: { id: accountId },
      });
  
      if (rowsUpdated[0] === 0) {
        res.status(404).json({ error: 'Account not found' });
        return;
      }
  
      const updatedAccount = await Account.findByPk(accountId); // Fetch the updated account separately
  
      res.status(200).json(updatedAccount);
    } catch (error) {
      console.error('Error updating account:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    
  // Delete Account
  router.delete('/company/:accountId', requireAuth, async (req, res, next) => {
    const accountId = req.params.accountId;
    const destroyAccount = await Account.findByPk(accountId);
  
    if (!destroyAccount) {
      return res.status(404).json({
        message: 'Account not found'
      });
    }
  
    await destroyAccount.destroy();
  
    return res.json({
      message: 'Account deleted successfully'
    });
  });
  
// Find by businessType
router.get("/businessType/:business", async (req, res) => {
    const {business} = req.params
    const company = await Account.findAll({
        
      where:{
        ownerId: req.user.id,
        businessType: req.params.business
      }
    })
      return res.json(company)
  });

  // Get all Accounts for current user
router.get('/current', requireAuth, async(req,res,next) => {
  
    const account = await Account.findAll({
        attributes: ['companyName', 'ownerId', 'businessType', 'id'],
        where: {
          ownerId: req.user.id
        },
        include: [{
          model: User,
          as: 'Owner',
          attributes: ['id'] 
        }]
    });

    if(!account){
        return res.json({
            message: 'no accounts found'
        })
    };

    return res.json(account)
});


// Create Account
router.post('/', async (req, res, next) => {
    req.body.ownerId = req.user.id;
    const { ownerId, companyName, businessType, fleetSize, equipmentType, lookingFor, firstName, lastName, email, phoneNumber, address, address2, state, city, zipCode, notes} =
      req.body;

      Account.create({
        ownerId: req.user.id,
        companyName,
        businessType,
        fleetSize: fleetSize,
        equipmentType: equipmentType,
        lookingFor: lookingFor,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        address2: address2,
        state: state,
        city: city,
        zipCode: zipCode,
        notes: notes
      }).then((response) => {
        console.log(response, "response in backend")
        res.json(response)
      })
      .catch((err) => {
        console.log("Error adding account", err)
      })
  });

  // Find by EquipmentType
  router.get("/equipmentType/:equipment", requireAuth, async (req, res, next) => {
    const {equipment} = req.params
    Account.findAll({
      where:{
        ownerId: req.user.id,
        equipmentType: {
          [Op.substring]: req.params.equipment 
      },
      
      }
    })
      .then((equipment) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(equipment);
      })
      .catch((err) => next(err));
  });

// Find by CompanyName
router.get("/companyName/:companyName", requireAuth, async (req, res) => {
  const {companyName} = req.params
  Account.findAll({
    where:{
      ownerId: req.user.id,
      companyName: companyName
    }
  })
    .then((companyName) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(companyName);
    })
    .catch((err) => next(err));
});


// Find by LookingFor
router.get("/lookingFor/:equipment", requireAuth, async (req, res, next) => {
  const {equipment} = req.params
  Account.findAll({
    where:{
      ownerId: req.user.id,
      lookingFor: {
        [Op.substring]: req.params.equipment 
    },
    }
  })
    .then((equipment) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(equipment);
    })
    .catch((err) => next(err));
});

// Find by City
router.get('/location/:city', requireAuth, async(req,res,next) => {
  const {city} = req.params
  const accounts = await Account.findAll({
    where:{
      ownerId: req.user.id,
      city: city
    }
  })
    .then((accounts) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(accounts);
    })
    .catch((err) => next(err));
})

module.exports = router;