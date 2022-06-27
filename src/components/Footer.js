import React from 'react';

function Footer() {
    return (
        <footer className="footer section text-center mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="social-media">
                            <li>
                                <a href="https://www.facebook.com/themefisher">
                                <img src='https://i.imgur.com/sUnPRVG.png' alt='' />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/themefisher">
                                <img src='https://i.imgur.com/P5Ri00z.png' alt='' />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/themefisher">
                                <img src='https://i.imgur.com/yMrZEU5.png' alt='' />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.pinterest.com/themefisher/">
                                <img src='https://i.imgur.com/k5quzOS.png' alt='' />
                                </a>
                            </li>
                        </ul>
                        <ul className="footer-menu text-uppercase">
                            <li>CONTACT</li>
                            <li>SHOP</li>
                            <li>Pricing </li>
                            <li>PRIVACY POLICY</li>
                        </ul>
                        <p className="copyright-text">Copyright &copy;2022, Designed &amp; Developed by Kalaivani</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
