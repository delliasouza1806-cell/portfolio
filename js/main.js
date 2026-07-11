const projects=[
    {
        title:"Protfolio Project (This Website!)",
        description:"A responsive personal portfolio built from scratch using HTML,CSS and vanilla JavaScript. Features a dynamic theme switcher and is populated by a JavaScript data structure.",
        imageUrl:"./images/portfolio-project-preview.jpg",
        liveUrl:"https://your-live-site.com",//replace with your actual deployed url when ready
        codeUrl:"https://github.com/delliasouza1806-cell/your-repo-name"//replace with your actual GitHub repo
    }
];
const themeToggle=document.querySelector('#theme-toggle');
const htmlElement=document.documentElement;
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