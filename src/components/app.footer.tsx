'use client'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About</h5>
                        <p>Your blog management platform for creating and sharing content.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white-50">Home</a></li>
                            <li><a href="#" className="text-white-50">Blog</a></li>
                            <li><a href="#" className="text-white-50">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <p>
                            <a href="#" className="text-white-50 me-2">Twitter</a>
                            <a href="#" className="text-white-50 me-2">Facebook</a>
                            <a href="#" className="text-white-50">LinkedIn</a>
                        </p>
                    </div>
                </div>
                <hr className="bg-white-50" />
                <div className="text-center">
                    <p className="mb-0">&copy; 2026 Blog Management. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}