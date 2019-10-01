const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const Members = [
  {
    id:1,
    name:'Shovon Das',
    email:'shovon@gmail.com',
    status:'active',
  },
  {
    id:2,
    name:'Asmit Das',
    email:'asmit@gmail.com',
    status:'active',
  },
  {
    id:3,
    name:'Md Sabuj Khan',
    email:'skhan@gmail.com',
    status:'notactive',
  },
  {
    id:4,
    name:'Shameem Hasan',
    email:'s.hasan@gmail.com',
    status:'active',
  },
];



// Get Single Member
router.get('/:id', (req, res) => {
  
  //  res.json(req.params.id);
  const found = Members.some(mem => mem.id === parseInt(req.params.id));
  found?(res.json(Members.filter(mem => mem.id === parseInt(req.params.id)))):res.status('400').json({msg: `Data Not Found for ID:${req.params.id}`});
  
});

// Old School
// router.get('/', (req, res) => {
//   // res.send('<h1>Hello World</h1>');
//   res.sendFile(path.join(__dirname,'public','index.html'));
// });


// Gets all members
router.get('/', (req, res) => {
  res.json(Members);
});


// Create a Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status:'active'
  }

  if(req.body.name === "" || req.body.email === ""){
    res.status('400').json({msg:'name or email field can\'t be empty'});
  }else{
    Members.push(newMember);
    res.json(Members);
  }


})


// Update a Member 
router.put('/:id', (req, res) => {
  
  //  res.json(req.params.id);
  const found = Members.some(mem => mem.id === parseInt(req.params.id));

  if(found){
    const updateMember = req.body;

    Members.forEach(mem => {
      if(mem.id === parseInt(req.params.id)){
        mem.name = updateMember.name ? updateMember.name : mem.name;
        mem.email = updateMember.email ? updateMember.aemail : mem.email;

        res.json({
          msg:'Member updated',
          Members
        });

      }
    })

  }else{
    res.status('400').json({msg: `Member Not Found for ID:${req.params.id}`})
  }
});


// Delete a member
router.delete('/', (req, res) => {

  const found = Members.some(mem => mem.id === parseInt(req.params.id));

  res.json(found);

});
module.exports = router;