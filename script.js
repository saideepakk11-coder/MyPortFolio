console.log("JS is working");

const revealElements = document.querySelectorAll
    (".reveal, .fade-in, .reveal-left, .reveal-right, .reveal-scale");

console.log("Reveal Elements: ", revealElements)

const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    })
});

revealElements.forEach((Element) =>{
    revealObserver.observe(Element)
});

const navLinks = document.querySelectorAll(".nav-page");

const sections = document.querySelectorAll
("#Home, #About, #skills, #education, #contact");

const navObserver = new IntersectionObserver((entries) =>{
   
    entries.forEach((entry) => {
        if(entry.isIntersecting){

            navLinks.forEach((link) =>{
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-page[href="#${entry.target.id}"]`
            );

            if(activeLink){
                activeLink.classList.add("active");
            }
        }
    });
}, {
    threshold:0.5
});

sections.forEach((section) =>{
    navObserver.observe(section);
});


const resumeBtn = document.querySelector("#resumeBtn");

resumeBtn.addEventListener("click",() =>{
    const resumePath= "resume.pdf";

    fetch(resumePath)
            .then((Response) =>{
                if (!Response.ok){
                    throw new Error("Resume not found")
                }

                const link= document.createElement("a");

                link.href = resumePath;
                link.download = "K-Sai-Deepak-Resume.pdf";

                document.body.appendChild(link);
                link.click();
                link.remove();
            })

            .catch(() => {
                alert("Resume is currently unavailable");
            })
})



const contactform = document.querySelector("#contactForm");

contactform.addEventListener("submit", (event) =>{

    //stop normal form submission
    event.preventDefault();

    //Get form values
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Create Whatsapp message

    const whatsappMessage = `
        New Portfolio Contact
        
        Name:${name}
        Email:${email}
        Subject:${subject}

        Message:${message}`;

        //your whatsapp number

        const phoneNumber = "9182667685";

        //create whatsapp URL
        const whatsappURL=
                `https://wa.me/${919182667685}?text=${encodeURIComponent(whatsappMessage)}`;

        //open WhatsApp
        window.open(whatsappURL, "_blank");
});