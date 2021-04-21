const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
	{id : 1, name:'course1'},
	{id : 2, name:'course2'},
	{id : 3, name:'course3'},
	{id : 4, name:'course4'}
];

app.get('/', (req, res ) => {
	res.send('Hello World !!!');
});


// Tampilkan Semua Data
app.get('/api/courses', (req, res)=>{
	res.send(courses);
});

// Tampilkan Data Berdasarkan ID
// /api/courses/1
app.get('/api/courses/:id', (req,res)=>{
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('ID tidak ditemukan...');
	res.send(course);
});



// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
// email: Joi.string() .min(6) .required() .email(),
// password: Joi.string() .min(6) .required() });

// const validation = schema.validate(req.body);
// res.send(validation);



// Tambahkan Data Baru
app.post('/api/courses', (req,res) => {
	// metode 1
	// const schema = Joi.object({
	// 	name: Joi.string().min(3).required()
	// });
	// const result = schema.validate(req.body);

	// if (result.error) {
	// 	res.status(400).send(result.error.details[0].message);
	// 	return;
	// };

	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// if(!req.body.name || req.body.name.length < 3) {
	// 	// 400 bad request
	// 	res.status(400).send('Nama Wajib Diisi minimal 3 karakter');
	// 	return;
	// };
	
	const course = {
		id : courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	res.send(course);
});



// Update Data Baru
app.put('/api/courses/:id', (req,res) =>{
	// mencari data course
	// tidak tersedia maka kembalikan 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('ID tidak ditemukan...');

	// validasi
	// jika data tidak valid, kembalikan 400 - bad request
	
	
	const { error } = validateCourse(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	

	// update data course
	course.name = req.body.name;

	// kembalikan data course
	res.send(course);
});


// fungsi validasi
function validateCourse(course) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});
	return schema.validate(course);
};


// Delete Data
app.delete('/api/courses/:id', (req,res) =>{
	// cari data course
	// jika tida tersedia maka kembalikan 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('ID tidak ditemukan...');

	// hapus data
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	// kembalikan data course
	res.send(course);
});



// -----------------Sampel--------------
// multiple parameter
app.get('/api/posts/:year/:month', (req,res)=>{
	res.send(req.params);
});

// query parameter
app.get('/api/posts/', (req,res)=>{
	// /api/posts/?keyword=Tes&category=Buddha
	res.send(req.query);
});

// -----------------Sampel--------------

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on port ${port}...`));