module.exports = {
    content: ["./templates/**/*.twig"],
    theme: {
        extend: {
        colors: {
            primary: "#EFFF10",
            secondary: "#202020",
            tertiary: "#F5F5F5",
            background: "#FFFFFF",
            // Studio Noir brand extras (pulled from the Figma design)
            ink: "#0D0D0D",
            cream: "#E5DFD5",
            sand: "#C4B5A0",
            muted: "#555555",
            typography: {
                text: "#202020",
                heading: "#202020",
                link: "#202020",
                link_hover: "#EFFF10",
            },
        },
        fontSize: {
            text_default_max: "16px",
            text_default: ".85vw",
            text_default_min: "15px",

            text_btn_max: "16px",
            text_btn: ".75vw",
            text_btn_min: "13px",

            text_hero_max: "135px",
            text_hero: "7.05vw",
            text_hero_min: "65px",

            text_h1_max: "70px",
            text_h1: "3.5vw",
            text_h1_min: "38px",

            text_h2_max: "45px",
            text_h2: "2.35vw",
            text_h2_min: "29px",

            text_h3_max: "32px",
            text_h3: "1.7vw",
            text_h3_min: "25px",

            text_h4_max: "24px",
            text_h4: "1.3vw",
            text_h4_min: "22px",
        },
        lineHeight: {
            line_default_max: "115%",
            line_default: "115%",
            line_default_min: "115%",

            line_btn_max: "115%",
            line_btn: "115%",
            line_btn_min: "115%",

            line_hero_max: "115%",
            line_hero: "115%",
            line_hero_min: "115%",

            line_h1_max: "115%",
            line_h1: "115%",
            line_h1_min: "115%",

            line_h2_max: "115%",
            line_h2: "115%",
            line_h2_min: "115%",

            line_h3_max: "115%",
            line_h3: "115%",
            line_h3_min: "115%",

            line_h4_max: "115%",
            line_h4: "115%",
            line_h4_min: "115%",
        },
        fontFamily: {
            body: ["Onest", "Inter Variable", "Inter", "Arial", "sans-serif"],
            heading: ["Space Grotesk", "Inter Variable", "Inter", "Arial", "sans-serif"],
            display: ["Space Grotesk", "Inter Variable", "Inter", "Arial", "sans-serif"],
        },
        screens: {
            xs: "440px",
            ml: "960px",
            resp: "960px",
            huge: "1900px",            
            container: "1920px",            
        },
        container: {
            center: true,
        },
        },
    },
    plugins: [
        function ({ addVariant }) {
        addVariant("child", "& > *");
        addVariant("childAll", "& *");
        addVariant("strong", "& strong");
        addVariant("link", "& a");
        },
    ],
};
