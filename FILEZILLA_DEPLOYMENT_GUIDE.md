# FileZilla Client Deployment Guide for UBookIt

This guide will help you deploy your UBookIt project using FileZilla Client.

## 📋 Prerequisites

1. **FileZilla Client** installed on your computer
2. **Server credentials** (hostname, username, password, port)
3. **Server access** to upload files via FTP/SFTP

## 🏗️ Project Structure

Your project has two main components:

1. **Next.js Frontend** (Static files) → Deploy to web server
2. **Java/JSP Backend** → Deploy to Java servlet container (Tomcat, etc.)

---

## 📦 Step 1: Build the Project (Already Done)

The project has been built. The static files are in the `dist/` directory.

If you need to rebuild:
```bash
npm run export
```

---

## 📤 Step 2: Connect to Server via FileZilla

1. **Open FileZilla Client**
2. **Enter your server details:**
   - **Host:** `your-server-address.com` (or IP address)
   - **Username:** Your FTP username
   - **Password:** Your FTP password
   - **Port:** `21` (FTP) or `22` (SFTP) - check with your server admin
   - **Protocol:** FTP or SFTP (recommended for security)

3. Click **Quickconnect** or press Enter

---

## 📁 Step 3: Deploy Next.js Frontend Files

### Location on Server:
Upload to: `/ismgroup17/ubookit/` (or your server's web root + basePath)

### Files to Upload:

1. **Navigate to the `dist/` folder** in your local FileZilla (left panel)

2. **Navigate to the server directory** `/ismgroup17/ubookit/` (right panel)

3. **Upload ALL contents** from `dist/` to `/ismgroup17/ubookit/`:
   - Select all files and folders in `dist/`
   - Right-click → **Upload**
   - Or drag and drop from left to right panel

### What to Upload:
- ✅ All HTML files
- ✅ `ismgroup17/` directory (if present)
- ✅ `static/` directory (CSS, JS, images)
- ✅ `_next/` directory (Next.js assets)
- ✅ Any JSON manifest files
- ✅ All other files in `dist/`

### Important Notes:
- ⚠️ **Maintain folder structure** - upload exactly as it appears in `dist/`
- ⚠️ **Upload permissions** - ensure files are readable (chmod 644 for files, 755 for directories)
- ⚠️ **Base path** - The files are built with basePath `/ismgroup17/ubookit`, so they must be uploaded to that exact location

---

## ☕ Step 4: Deploy Java/JSP Backend Files

### Location on Server:
Upload to your Java servlet container's webapps directory (e.g., Tomcat's `webapps/` folder)

### Files to Upload:

1. **JSP Files** (from `src/app/`):
   - `header.jsp`
   - `footer.jsp`
   - `orderbooks.jsp`
   - `payment.jsp`
   - `paymentController.jsp`

2. **Java Classes** (from `src/app/java_classes/`):
   - `DB.java`
   - `Payment.java`
   - `PaymentDAO.java`

### Upload Instructions:

**For JSP files:**
- Upload to: `/webapps/ismgroup17/ubookit/` (or your app's WEB-INF directory)
- JSP files should be in the web root or appropriate servlet directory

**For Java classes:**
- Java `.java` files need to be **compiled** first
- Compiled `.class` files should go to: `/WEB-INF/classes/app/java_classes/`
- Or compile on the server if you have access

### Compilation (if needed):
```bash
# On server or locally
javac -cp "path/to/servlet-api.jar:path/to/mysql-connector.jar" \
  src/app/java_classes/*.java
```

---

## 🔧 Step 5: Configure Server Settings

### Apache Configuration (if using Apache):

Create or edit `.htaccess` in `/ismgroup17/ubookit/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /ismgroup17/ubookit/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /ismgroup17/ubookit/index.html [L]
</IfModule>
```

### Nginx Configuration (if using Nginx):

```nginx
location /ismgroup17/ubookit {
  try_files $uri $uri/ /ismgroup17/ubookit/index.html;
}
```

---

## ✅ Step 6: Verify Deployment

1. **Check file permissions:**
   - Files: `644` (rw-r--r--)
   - Directories: `755` (rwxr-xr-x)

2. **Test the application:**
   - Visit: `https://your-server.com/ismgroup17/ubookit/`
   - Check browser console for errors
   - Verify all assets load correctly

3. **Common issues:**
   - **404 errors:** Check basePath configuration
   - **Missing assets:** Verify `static/` and `_next/` directories uploaded
   - **Routing issues:** Ensure server rewrite rules are configured

---

## 📝 FileZilla Tips

### Setting File Permissions:
1. Right-click on file/folder → **File permissions...**
2. Set:
   - Files: `644`
   - Directories: `755`

### Transfer Settings:
1. **Edit** → **Settings** → **Transfers**
2. Set **Transfer type** to **Auto**
3. Enable **Preserve timestamps of transferred files**

### Queue Management:
- Monitor upload progress in the **Queue** tab
- Failed transfers will show in red - retry as needed

---

## 🗂️ Quick Reference: What Goes Where

| Component | Local Path | Server Path |
|-----------|-----------|-------------|
| **Next.js Static Files** | `dist/` | `/ismgroup17/ubookit/` |
| **JSP Files** | `src/app/*.jsp` | `/webapps/ismgroup17/ubookit/` |
| **Java Classes** | `src/app/java_classes/*.java` | `/WEB-INF/classes/app/java_classes/` |
| **Public Assets** | `public/assets/` | Already in `dist/` |

---

## 🚨 Important Notes

1. **Backup before deployment** - Always backup existing files
2. **Test locally first** - Use `npm run serve` to test the build
3. **Database connection** - Ensure Java classes can connect to your database
4. **Environment variables** - Configure any needed environment variables on the server
5. **SSL/HTTPS** - Ensure your server supports HTTPS for production

---

## 📞 Troubleshooting

### Files not uploading:
- Check file permissions on server
- Verify FTP/SFTP credentials
- Check server disk space

### 404 errors after deployment:
- Verify basePath matches server directory structure
- Check server rewrite rules
- Clear browser cache

### Java/JSP errors:
- Verify Java servlet container is running
- Check Java class compilation
- Review server logs

---

## 🎯 Deployment Checklist

- [ ] Project built successfully (`npm run export`)
- [ ] Connected to server via FileZilla
- [ ] Uploaded all files from `dist/` to `/ismgroup17/ubookit/`
- [ ] Uploaded JSP files to appropriate location
- [ ] Compiled and uploaded Java classes (if needed)
- [ ] Set correct file permissions (644/755)
- [ ] Configured server rewrite rules
- [ ] Tested application in browser
- [ ] Verified all assets load correctly
- [ ] Checked browser console for errors

---

**Good luck with your deployment! 🚀**
