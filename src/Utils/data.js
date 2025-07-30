// Get lightest average color from an image
export const getLightColorFromImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        // Check if imageUrl is valid
        if (!imageUrl || typeof imageUrl !== 'string') {
            return reject(new Error('Invalid image URL'));
        }

        const img = new Image();

        // Set crossOrigin for non-base64 images to avoid CORS issues
        if (!imageUrl.startsWith('data:')) {
            img.crossOrigin = 'anonymous';
        }

        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];

                const brightness = (red + green + blue) / 3;

                // Only consider bright pixels
                if (brightness > 180) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }

            if (count === 0) {
                resolve('#ffffff'); // fallback
            } else {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                resolve(`rgb(${r}, ${g}, ${b})`);
            }
        };

        img.onerror = (e) => {
            console.error('❌ Failed to load image:', e);
            reject(new Error('Image could not be loaded or is blocked by CORS.'));
        };
    });
};

import TEMPLATE_ONE_IMG from '../assets/TEMPLATE_ONE_IMG.png';
import TEMPLATE_TWO_IMG from '../assets/TEMPLATE_TWO_IMG.png';
import TEMPLATE_THREE_IMG from '../assets/TEMPLATE_THREE_IMG.png';

export const resumeTemplates = [
    {
        id: '01',
        theme: 'templateOne',
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPaletteCode: 'themeOne',
    },
    {
        id: '02',
        theme: 'templateTwo',
        thumbnailImg: TEMPLATE_TWO_IMG,
        colorPaletteCode: 'themeTwo',
    },
    {
        id: '03',
        theme: 'templateThree',
        thumbnailImg: TEMPLATE_THREE_IMG,
        colorPaletteCode: 'themeThree',
    },
];


export const themeColorPalette = {
    themeOne: [
        ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
        ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
        ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
        ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
        ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
        ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
        ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
        ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
        ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
        ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
        ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
        ["#F7F767", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
        ["#E3F2FD", "#90CAF9", "#A8D2F4", "#1E88E5", "#0D47A1"]
    ]
};


export const dummyResume = {
    userID: "64f7e9fc8b2c3c7e1e4a9a23", // Example ObjectId string
    title: "Software Engineer Resume",
    thumbnaillink: "https://example.com/thumbnail.jpg",

    profileInfo: {
        profilePreviewUrl: "",
        fullName: "Ali Shah",
        designation: "Full Stack Developer",
        summary: "Passionate software engineer with 3+ years of experience in building web applications."
    },

    contactInfo: {
        email: "ali@example.com",
        phone: "+92-300-1234567",
        location: "Lahore, Pakistan",
        linkedin: "https://linkedin.com/in/alishah",
        github: "https://github.com/ali-dev"
    },

    workExperience: [
        {
            company: "TechSoft",
            role: "Frontend Developer",
            startDate: "Jan 2022",
            endDate: "Present",
            description: "Worked on React.js projects and contributed to UI/UX improvements."
        },
        {
            company: "DevSolutions",
            role: "Intern",
            startDate: "Jun 2021",
            endDate: "Dec 2021",
            description: "Assisted in backend API development using Node.js."
        }
    ],

    education: [
        {
            degree: "BS Computer Science",
            institue: "COMSATS University",
            startDate: "2018",
            endDate: "2022"
        }
    ],

    skills: [
        { name: "JavaScript", progress: 90 },
        { name: "React", progress: 85 },
        { name: "Node.js", progress: 80 }
    ],

    projects: [
        {
            title: "E-commerce Website",
            description: "Built a full-stack e-commerce platform using MERN stack.",
            github: "https://github.com/ali-dev/ecommerce",
            liveDemo: "https://ecommerce-demo.vercel.app"
        },
        {
            title: "Chat App",
            description: "Realtime chat application using Socket.io.",
            github: "https://github.com/ali-dev/chat-app",
            liveDemo: "https://chat-app-demo.vercel.app"
        }
    ],

    certifications: [
        {
            title: "Full Stack Developer Certificate",
            issuer: "Coursera",
            year: "2023"
        }
    ],

    languages: [
        { name: "English", progress: 95 },
        { name: "Urdu", progress: 100 }
    ],

    interests: ["Reading", "Cricket", "Tech Blogging"],

    template: {
        theme: "modern",
        colorPalette: "blue-purple"
    }
};
