# Quick Deployment Checklist for FileZilla

## ✅ Pre-Deployment

- [x] Project built successfully (`npm run export`)
- [ ] Verified `dist/` folder contains all files
- [ ] Have server FTP/SFTP credentials ready

## 📤 FileZilla Connection

- [ ] Open FileZilla Client
- [ ] Enter server details:
  - Host: `_________________`
  - Username: `_________________`
  - Password: `_________________`
  - Port: `21` (FTP) or `22` (SFTP)
- [ ] Click Quickconnect
- [ ] Verify connection successful

## 📁 Upload Next.js Files

- [ ] Navigate to local `dist/` folder (left panel)
- [ ] Navigate to server `/ismgroup17/ubookit/` (right panel)
- [ ] Select ALL files and folders in `dist/`
- [ ] Right-click → Upload (or drag & drop)
- [ ] Wait for upload to complete
- [ ] Verify all files uploaded successfully

## ☕ Upload Java/JSP Files (if applicable)

- [ ] Upload JSP files to: `/webapps/ismgroup17/ubookit/`
  - [ ] `header.jsp`
  - [ ] `footer.jsp`
  - [ ] `orderbooks.jsp`
  - [ ] `payment.jsp`
  - [ ] `paymentController.jsp`
- [ ] Compile Java classes (if needed)
- [ ] Upload compiled `.class` files to: `/WEB-INF/classes/app/java_classes/`

## 🔧 Set Permissions

- [ ] Set file permissions to `644` (rw-r--r--)
- [ ] Set directory permissions to `755` (rwxr-xr-x)
- [ ] Right-click on files/folders → File permissions

## ✅ Post-Deployment Verification

- [ ] Visit: `https://your-server.com/ismgroup17/ubookit/`
- [ ] Test homepage loads
- [ ] Test navigation between pages
- [ ] Check browser console for errors (F12)
- [ ] Verify images load correctly
- [ ] Test login functionality
- [ ] Verify all routes work

## 🐛 If Issues Occur

- [ ] Check file permissions
- [ ] Verify basePath matches server directory
- [ ] Check server error logs
- [ ] Clear browser cache
- [ ] Verify all files uploaded (no missing files)

---

**Deployment Date:** _______________
**Deployed By:** _______________
**Server URL:** _______________


