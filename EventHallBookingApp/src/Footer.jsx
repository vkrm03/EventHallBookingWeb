import React from "react";
import "../public/about.css";

function FooterBar() {
    return (
        <div>
            <footer className="link-icons">
                <a href="https://www.facebook.com/SathyabamaOfficial/" className="fb"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/sathyabama.official/" className="ig"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.youtube.com/channel/UCkBMqT83pxjwPhh8mUpZ0hQ" className="yt"><i className="fa-brands fa-youtube"></i></a>
                <a href="https://x.com/sathyabamauniv?lang=en" className="x"><i className="fa-brands fa-twitter"></i></a>
                <a href="https://www.linkedin.com/school/sathyabama-institute-of-science-&-technology-chennai/posts/?feedView=all" className="in"><i className="fa-brands fa-linkedin"></i></a>
            </footer>
        </div>
    );
}

export default FooterBar;
