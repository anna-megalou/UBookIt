<!-- header.jsp -->
<header class="fixed top-0 left-0 right-0 z-60 bg-primary-light pt-6 pb-4">
    <div class="container-header">
        <div class="flex flex-row justify-between items-center w-full relative">

            <!-- Logo -->
            <div class="header-logo">
                UniBookIt
            </div>

            <!-- Navigation -->
            <div class="flex flex-row justify-end items-center gap-20">
                <div class="flex flex-row">
                    <a href="<%= request.getContextPath() %>/service" class="text-secondary-dark hover:text-primary-dark text-lg font-bold">
                        Service
                    </a>
                    <a href="<%= request.getContextPath() %>/about" class="text-secondary-dark hover:text-primary-dark text-lg font-bold">
                        About
                    </a>
                    <a href="<%= request.getContextPath() %>/faq" class="text-secondary-dark hover:text-primary-dark text-lg font-bold">
                        FAQ
                    </a>
                    <div class="profile-circle">
                        MS
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
