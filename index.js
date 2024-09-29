import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();


// app.use(express.json());
// const url = 'mongodb+srv://manindrakhandyana:lXH8H9CA64nuizKj@firstcluster.imc1m.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster'
mongoose.connect('mongodb+srv://manindrakhandyana:lXH8H9CA64nuizKj@firstcluster.imc1m.mongodb.net/Blog_Application_f?retryWrites=true&w=majority&appName=FirstCluster')
.then(()=>console.log("connected"))
.catch(()=>console.log("Error"));

const category_x = ['Psychology','Philosophy','Time Management'];


const Blog_Schema = new mongoose.Schema( 
    {
        title:{
            type:String,
            required:true,
            minlength:0,
            maxlength:50
        },
        description:
        {
            type:String,
            required:true,
            minlength:0,
            maxlength:100
        },
        date:{
            type:Date,
            required:true
        },
        category:
        {
            type:String,
            enum:category_x
        }

    }
)
const Blogs = mongoose.model('Blog',Blog_Schema)


const Projects_category = [{title:'Multiple Disease Prediction System',code:'MDPS'},
    {title:'Real Estate Price Prediction System',code:'REPPS'},

    {title:'Weather Application Using React',code:'WAUR'},
    {title:'Personal Portfolio',code:'PP'},
    ];


// schema contains - title, description, technology

const Project_Schema = new mongoose.Schema( 
    {
        title:{
            type:String,
            required:true,
            minlength:0,
            maxlength:50
        },
        description:
        {
            type:String,
            required:true,
            minlength:0,
            maxlength:10000
        },
        technology:
        {
            type:String,
            required:true,
            minlength:0,
            maxlength:100
            
        },
        code:
        {
            type:String,
            required:true,
            minlength:0,
            maxlength:10
        }
    }
)

const Projects = mongoose.model('Project',Project_Schema)



app.use(cors(
    {origin: '*'}
))

app.get('/',(req,res)=>{
    res.send("server is running");
})

app.get('/Blogs',async (req,res)=>{
    // console.log('Collections in the database:', category_x);
    res.send(category_x);
})
app.get('/Blogs/:name',async(req,res)=>{
    let blg = await Blogs.find({category:req.params.name}).sort({'date':-1});
    if(!blg) return res.status(404).send('Given id not found');
    res.send(blg);
})

app.get('/Projects',async(req,res)=>{
    res.send(Projects_category);
})

app.get('/Projects/:name',async(req,res)=>{
    let blg = await Projects.find({code:req.params.name});
    if(!blg) return res.status(404).send('Given id not found');
    res.send(blg);
})

async function insertProject()
{

    await Projects.create({
        title:'Multiple Disease Prediction System',
        description:'Machine learning and Artificial Intelligence are playing a huge role in today’s world. From self-driving cars to medical fields. The medical industry generates a huge amount of patient data which can be processed in a lot of ways. So, with the help of machine learning, The model can detect more than one disease at a time. Many of the existing systems can predict only one disease at a time and that too with lower accuracy. Lower accuracy can seriously put a patient’s health in danger. The user has to enter various parameters of the disease and the system would display the output whether user has the disease or not. This system can help a lot of people as one can monitor the persons’ condition and take the necessary precautions thus increasing the life expectancy. As machine learning algorithms and healthcare technology continue to evolve, the accuracy and effectiveness of multiple disease prediction systems are likely to improve, leading to even better patient care and disease management. Multiple disease prediction systems have the potential to revolutionize healthcare by improving patient care and reducing healthcare costs.',
        technology:'Machine Learning',
        code:'MDPS'
    })
}
// insertProject();


async function insert()
{

    await Psychology.create({
        title:"second psychology",
        description:"This is psychology descritp",
        date:Date.now()
    })
}
//insert();


const port = 3001;
app.listen(3001, ()=>{
    console.log(`listening on port ${port}...`)
})