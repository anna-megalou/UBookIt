<!-- header.jsp -->
<%
    // Determine if we should show "Log out" or "Sign In"
    String currentPath = request.getRequestURI();
    String contextPath = request.getContextPath();
    boolean showLogout = currentPath.contains("/orderbooks") || 
                         currentPath.contains("/confirm/declaration") || 
                         currentPath.contains("/select/books");
    String buttonText = showLogout ? "Log out" : "Sign In";
    String buttonHref = showLogout ? contextPath + "/" : contextPath + "/login/prequalification";
%>
<header style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; background-color: #F0F9FF; padding-top: 1.5rem; padding-bottom: 1rem; height: 80px;">
    <div style="max-width: 1400px; margin: 0 auto; padding: 0 1rem;">
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; position: relative;">
            <!-- Logo and Breadcrumb -->
            <div style="display: flex; flex-direction: row; align-items: center; gap: 1rem; flex: none;">
                <a href="<%= contextPath %>/" style="text-decoration: none; font-size: 2.25rem; font-weight: bold; color: #04235C;">
                    UBookIt
                </a>
                <!-- Breadcrumb -->
                <div class="breadcrumbs" style="display: flex; align-items: center;">
                    <ul style="display: flex; flex-wrap: wrap; align-items: center; list-style: none; padding: 0; margin: 0; gap: 0.5rem;">
                        <li><a href="<%= contextPath %>/" style="color: #04235C; text-decoration: none; transition: color 0.2s;">Home</a></li>
                        <li style="display: flex; align-items: center; color: #99AAC1; margin: 0 0.25rem;">/</li>
                        <li><span aria-current="page" style="color: #04235C; font-weight: 500;">Order Books</span></li>
                    </ul>
                </div>
            </div>

            <!-- Navigation -->
            <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; gap: 2rem;">
                <nav style="display: flex; flex-direction: row; gap: 1rem;">
                    <a href="<%= contextPath %>/ubookit/#hero" style="color: #304D79; text-decoration: none; font-weight: bold; font-size: 1.125rem; transition: color 0.2s;" onmouseover="this.style.color='#04235C'" onmouseout="this.style.color='#304D79'">
                        Service
                    </a>
                    <a href="<%= contextPath %>/ubookit/#about" style="color: #304D79; text-decoration: none; font-weight: bold; font-size: 1.125rem; transition: color 0.2s;" onmouseover="this.style.color='#04235C'" onmouseout="this.style.color='#304D79'">
                        About
                    </a>
                    <a href="<%= contextPath %>/ubookit/#faq" style="color: #304D79; text-decoration: none; font-weight: bold; font-size: 1.125rem; transition: color 0.2s;" onmouseover="this.style.color='#04235C'" onmouseout="this.style.color='#304D79'">
                        FAQ
                    </a>
                </nav>
                <a href="<%= buttonHref %>" style="display: inline-flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 9999px; transition: background-color 0.2s; background-color: #04235C; color: white; padding: 0.5rem 1.5rem; font-size: 0.875rem; height: 40px; text-decoration: none; cursor: pointer;" onmouseover="this.style.backgroundColor='#304D79'" onmouseout="this.style.backgroundColor='#04235C'">
                    <%= buttonText %>
                </a>
            </div>
        </div>
    </div>
</header>
