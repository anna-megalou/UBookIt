<footer style="background-color: #f5f8ff; padding: 1rem 1rem;">
    <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">

        <!-- Links & Copyright -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; gap: 2rem;">
                <a href="<%= request.getContextPath() %>/service" style="text-decoration: none; color: #04235C; font-weight: bold;">Service</a>
                <a href="<%= request.getContextPath() %>/about" style="text-decoration: none; color: #04235C; font-weight: bold;">About</a>
                <a href="<%= request.getContextPath() %>/faq" style="text-decoration: none; color: #04235C; font-weight: bold;">FAQ</a>
            </div>
            <div style="color: #6b7280; font-size: 0.875rem;">
                &copy; 2025 - All rights reserved by ACME Industries Ltd.
            </div>
        </div>

        <!-- Social Media Icons -->
        <div style="display: flex; gap: 1.5rem; font-size: 1.5rem;">
            <a href="#" aria-label="Twitter" style="margin-top: 4px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#04235C" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
            </a>
            <!-- LinkedIn -->
            <a href="#" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#04235C" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5v-7.2c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.8-2.8 3.8V24h-5V8z"/>
                </svg>
            </a>
            <!-- Instagram -->
            <a href="#" aria-label="Instagram" style="margin-top: 4px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.25 2.25a.75.75 0 110 1.5.75.75 0 010-1.5zm-4.25 1.25a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" fill="#04235C"/>
                </svg>
            </a>
        </div>
    </div>
</footer>
