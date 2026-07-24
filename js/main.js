const projects=[
    {
        title:"Portfolio Project (This Website!)",
        description:"A responsive personal portfolio built from scratch using HTML,CSS and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
        imageUrl:"./images/profile-picture.webp",
        liveUrl:"https://aquamarine-quokka-563f5f.netlify.app/",//replace with your actual deployed url when ready
        codeUrl:"https://github.com/delliasouza1806-cell/portfolio"//replace with your actual GitHub repo
    },
    //project object 1
    {
        title: "E-commerce Website Concept",
        description:"A concept design and front-end implementation for an e-commerce platform.Focused on a clean UI, responsive prodct grids, and a streamlined chekout process using modern CSS techniques.",
        imageUrl:"./images/ecommerece-project-preview.webp",
        liveUrl:"https://electroniccom.netlify.app/",
        codeUrl:"https://github.com/delliasouza1806-cell/E-commerce-Website"//replace with your repo link
    },
    //project object 2
    {
        title:"Task Management App",
        description:"A client-side task management application built with vanilla JavaScript.Allows users to add, edit, delete and mark tasks as complete, with all data saved to localStorage.",
        imageUrl:"./images/task-app-preview.webp",
        liveUrl:"https://taskcontrolapp.netlify.app/",
        codeUrl:"https://github.com/delliasouza1806-cell/Task-Management-App.git"
    },
    {
        title: "Mathematicia",
        description: "A mathematical tool designed to make working with computational number theory problems easy, efficient, and fast.",
        imageUrl: "images/project-placeholder1.webp",
        liveUrl: "#",
        codeUrl: "https://github.com/delliasouza1806-cell/Mathematicia.git"
    },
    {
        title: "Paillier Cryptosystem Implementation",
        description: "An implementation of the asymmetric public-key encryption algorithm. It enables privacy-preserving computations to be executed seamlessly on completely encrypted data files without decryption.",
        imageUrl: "images/project-placeholder2.webp",
        liveUrl: "https://paillier.netlify.app/",
        codeUrl: "https://github.com/delliasouza1806-cell/Paillier-Cryptosystem.git"
    },
];
const themeToggle=document.querySelector('#theme-toggle');
const htmlElement=document.documentElement;
const projectContainer=document.querySelector('.project-container');
const contactForm=document.querySelector('#contact-form');
const formStatus=document.querySelector('#form-status');
const renderProjects=()=>{
    let allProjectsHTML='';
    projects.forEach(project =>{
        const projectCardHTML =/*html*/`
            <div class="project-card">
                <div class="project-image-container">
                    <img
                       src="${project.imageUrl}"
                       alt="Screenshot of the ${project.title} project"
                       class="project-image"
                    >
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.liveUrl}" class="btn" target="_blank" rel="noopener noreferrer">Live Demo</a>
                        <a href="${project.codeUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View Code</a>
                    </div>
                </div>
            </div>
        `;
        allProjectsHTML +=projectCardHTML;
    });
    projectContainer.innerHTML= allProjectsHTML;
};
renderProjects();
themeToggle.addEventListener('click',() =>{
    const newTheme=themeToggle.checked ? 'dark':'light';
    htmlElement.setAttribute('data-theme',newTheme);
    localStorage.setItem('theme',newTheme);
});
(() =>{
    const savedTheme=localStorage.getItem('theme');
if(savedTheme){
    htmlElement.setAttribute('data-theme',savedTheme);
    if(savedTheme === 'dark'){
        themeToggle.checked=true;
    }
}
})();
document.addEventListener('DOMContentLoaded',()=>{
    renderProjects();
    if(contactForm){
    contactForm.addEventListener('submit',(event)=>{
        event.preventDefault();
        const formData=new FormData(contactForm);
        const submitButton=contactForm.querySelector('button[type="submit"]');
        formStatus.innerHTML='Sending...';
        formStatus.className='info';
        formStatus.style.display='block';
        submitButton.disabled=true;
        fetch(contactForm.ariaDescription,{
            method:'POST',
            body:formData,
            headers:{
                'Accept':'application/json'
            }
        }).then(response =>{
            if(response.ok){
                formStatus.innerHTML="Thank you! your message has been sent.";
                formStatus.className='success';
                contactForm.reset();
            }else{
                response.json().then(data=>{
                    if(Object.hasOwn(data,'errors')){
                        formStatus.innerHTML=data["errors"].map(error => error["message"]).join(",");
                    }else{
                        formStatus.innerHTML="Oops! Something went wrong. Please try again later.";
                    }
                    formStatus.className='error';
                })
            }
        }).catch(error =>{
            formStatus.innerHTML="Oops! A network error occurred. Please check your connection and try again.";
            formStatus.className='error';
        }).finally(()=>{
            submitButton.disabled=false;
        });
    });
}
});