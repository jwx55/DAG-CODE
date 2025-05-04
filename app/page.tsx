"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronDown,
  ChevronUp,
  Download,
  Code,
  FileCode,
  FileText,
  Eye,
  Copy,
  Save,
  FileUp,
  Wand2,
  Menu,
  Palette,
  Grid,
  HelpCircle,
  FolderOpen,
  Languages,
  Maximize,
  Minimize,
  Settings,
  Info,
  X,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

// Translations
const translations = {
  en: {
    // General
    appName: "DAG Code",
    appDescription: "Separate HTML, CSS, and JavaScript code with a modern UI",
    welcomeMessage: "Welcome to DAG Code",
    welcomeSubtitle: "Separate and edit HTML, CSS, and JavaScript code with ease",

    // Main interface
    combinedCode: "Combined Code (HTML, CSS, JavaScript):",
    placeholderText: "Paste your code here...",
    separateAndView: "Separate & View Code",
    saveProject: "Save Project",
    downloadProject: "Download Full Project",
    noSavedProjects: "No saved projects",

    // Tabs
    preview: "Live Preview",

    // File names
    htmlFile: "index.html",
    cssFile: "style.css",
    jsFile: "script.js",

    // Actions
    format: "Format Code",
    copy: "Copy to Clipboard",
    collapse: "Collapse",
    expand: "Expand",
    download: "Download",

    // Menu
    menu: "Menu",
    instructions: "Usage Instructions",
    savedProjects: "Saved Projects",
    language: "Language",
    focusMode: "Focus Mode",
    exitFocusMode: "Exit Focus Mode",
    customize: "Customize",

    // Dialogs
    uploadFile: "Upload File",
    uploadFileDesc: "Choose an HTML file to upload",
    examples: "Examples",
    examplesDesc: "Choose a ready-made example to start with",
    saveProjectTitle: "Save Project",
    saveProjectDesc: "Enter a name for your project",
    projectName: "Project Name",
    save: "Save",

    // Notifications
    errorEnterCode: "Please enter some code first",
    successSeparated: "Code separated successfully",
    errorSeparating: "Error separating code. Make sure the code is valid.",
    successDownload: "Downloaded successfully",
    errorDownload: "Error downloading file",
    successCopy: "Copied to clipboard",
    errorCopy: "Error copying to clipboard",
    errorSaveName: "Please enter a project name",
    successSave: "Project saved successfully",
    errorSave: "Error saving project",
    successLoad: "Project loaded successfully",
    errorLoad: "Error loading project",
    successDelete: "Project deleted successfully",
    errorDelete: "Error deleting project",
    successUpload: "File uploaded successfully",
    errorUpload: "Error reading file",
    successExample: "Example loaded successfully. Click 'Separate & View Code' to continue.",
    errorExample: "Error loading example",
    successFormat: "Code formatted successfully",
    errorFormat: "Error formatting code",

    // Usage instructions
    howToUse: "How to Use",
    step1Title: "1. Enter Code",
    step1Desc: "Enter the complete HTML code in the top text box, then click the 'Separate & View Code' button.",
    step2Title: "2. Edit Sections",
    step2Desc: "After separating the code, you can edit the HTML, CSS, and JavaScript sections separately.",
    step3Title: "3. Live Preview",
    step3Desc: "Click on the 'Live Preview' tab to see the result of the code directly.",
    step4Title: "4. Save and Download",
    step4Desc: "You can save the project or download it as a complete HTML file or download each section separately.",
    step5Title: "5. Format Code",
    step5Desc: "Use the format button (wand icon) to automatically format the code.",
    step6Title: "6. Copy Code",
    step6Desc: "You can copy the code from any section using the copy button (copy icon).",
    step7Title: "7. Ready Examples",
    step7Desc: "Use the ready-made examples to quickly start your project.",
    step8Title: "8. Upload File",
    step8Desc: "You can upload an existing HTML file to edit it in the application.",
    step9Title: "9. Focus Mode",
    step9Desc: "Use focus mode to hide everything except the editor for distraction-free coding.",

    // About
    about: "About",
    aboutDesc:
      "DAG Code is an application for separating and editing HTML, CSS, and JavaScript code with live preview of results.",
    developer: "Made by Sufyan Dagher",

    // Examples
    basicExample: "Basic Example",
    basicExampleDesc: "Simple HTML page with CSS and JavaScript",
    animationExample: "Animation",
    animationExampleDesc: "Example of animation using CSS",
    responsiveExample: "Responsive Design",
    responsiveExampleDesc: "Example of responsive design for different screen sizes",
    darkModeExample: "Dark Mode",
    darkModeExampleDesc: "Example of toggling between dark and light modes",
    gridLayoutExample: "Grid Layout",
    gridLayoutExampleDesc: "Example of grid layout using CSS Grid",

    // Customization
    customizeTitle: "Customize Appearance",
    customizeDesc: "Change the colors and appearance of the application",
    themes: "Themes",
    defaultTheme: "Default",
    darkTheme: "Dark",
    lightTheme: "Light",
    blueTheme: "Blue",
    purpleTheme: "Purple",
    greenTheme: "Green",
    customTheme: "Custom",
    primaryColor: "Primary Color",
    secondaryColor: "Secondary Color",
    backgroundColor: "Background Color",
    textColor: "Text Color",
    resetColors: "Reset Colors",
    applyTheme: "Apply Theme",

    login: "Login",
    logout: "Logout",
    username: "Username",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    loginSuccess: "Login successful",
    logoutSuccess: "Logged out successfully",
    profileUpdated: "Profile updated",
    chooseAvatar: "Choose Avatar",
    closeAvatarSelector: "Close",
    gradientColor: "Gradient",
    sunsetTheme: "Sunset",
    oceanTheme: "Ocean",
    forestTheme: "Forest",
    midnightTheme: "Midnight",
  },
  ar: {
    // General
    appName: "DAG Code",
    appDescription: "فصل أكواد HTML و CSS و JavaScript مع واجهة حديثة",
    welcomeMessage: "مرحباً بك في DAG Code",
    welcomeSubtitle: "فصل وتحرير أكواد HTML و CSS و JavaScript بسهولة",

    // Main interface
    combinedCode: "الكود المدمج (HTML, CSS, JavaScript):",
    placeholderText: "ضع الكود هنا...",
    separateAndView: "فصل وعرض الكود",
    saveProject: "حفظ المشروع",
    downloadProject: "تنزيل المشروع كاملاً",
    noSavedProjects: "لا توجد مشاريع محفوظة",

    // Tabs
    preview: "معاينة مباشرة",

    // File names
    htmlFile: "index.html",
    cssFile: "style.css",
    jsFile: "script.js",

    // Actions
    format: "تنسيق الكود",
    copy: "نسخ إلى الحافظة",
    collapse: "طي",
    expand: "توسيع",
    download: "تنزيل",

    // Menu
    menu: "القائمة",
    instructions: "شرح الاستخدام",
    savedProjects: "المشاريع المحفوظة",
    language: "اللغة",
    focusMode: "وضع التركيز",
    exitFocusMode: "إنهاء وضع التركيز",
    customize: "تخصيص",

    // Dialogs
    uploadFile: "تحميل ملف",
    uploadFileDesc: "اختر ملف HTML لتحميله في المحرر",
    examples: "أمثلة",
    examplesDesc: "اختر أحد الأمثلة الجاهزة للبدء",
    saveProjectTitle: "حفظ المشروع",
    saveProjectDesc: "أدخل اسماً للمشروع لحفظه",
    projectName: "اسم المشروع",
    save: "حفظ",

    // Notifications
    errorEnterCode: "الرجاء إدخال بعض الكود أولاً",
    successSeparated: "تم فصل الكود بنجاح",
    errorSeparating: "حدث خطأ أثناء محاولة فصل الكود. تأكد من صحة الكود المدخل.",
    successDownload: "تم التنزيل بنجاح",
    errorDownload: "حدث خطأ أثناء محاولة تنزيل الملف",
    successCopy: "تم النسخ إلى الحافظة",
    errorCopy: "حدث خطأ أثناء محاولة نسخ الكود",
    errorSaveName: "يرجى إدخال اسم للمشروع",
    successSave: "تم حفظ المشروع بنجاح",
    errorSave: "حدث خطأ أثناء محاولة حفظ المشروع",
    successLoad: "تم تحميل المشروع بنجاح",
    errorLoad: "حدث خطأ أثناء محاولة تحميل المشروع",
    successDelete: "تم حذف المشروع بنجاح",
    errorDelete: "حدث خطأ أثناء محاولة حذف المشروع",
    successUpload: "تم تحميل الملف بنجاح",
    errorUpload: "حدث خطأ أثناء قراءة الملف",
    successExample: "تم تحميل المثال بنجاح. انقر على 'فصل وعرض الكود' للمتابعة.",
    errorExample: "حدث خطأ أثناء محاولة تحميل المثال",
    successFormat: "تم تنسيق الكود بنجاح",
    errorFormat: "حدث خطأ أثناء محاولة تنسيق الكود",

    // Usage instructions
    howToUse: "كيفية الاستخدام",
    step1Title: "1. إدخال الكود",
    step1Desc: "أدخل الكود HTML الكامل في مربع النص العلوي، ثم انقر على زر 'فصل وعرض الكود'.",
    step2Title: "2. تحرير الأقسام",
    step2Desc: "بعد فصل الكود، يمكنك تحرير أقسام HTML و CSS و JavaScript بشكل منفصل.",
    step3Title: "3. معاينة مباشرة",
    step3Desc: "انقر على تبويب 'معاينة مباشرة' لرؤية نتيجة الكود مباشرة.",
    step4Title: "4. حفظ وتنزيل",
    step4Desc: "يمكنك حفظ المشروع أو تنزيله كملف HTML كامل أو تنزيل كل قسم على حدة.",
    step5Title: "5. تنسيق الكود",
    step5Desc: "استخدم زر التنسيق (أيقونة العصا) لتنسيق الكود بشكل تلقائي.",
    step6Title: "6. نسخ الكود",
    step6Desc: "يمكنك نسخ الكود من أي قسم باستخدام زر النسخ (أيقونة النسخ).",
    step7Title: "7. الأمثلة الجاهزة",
    step7Desc: "استخدم الأمثلة الجاهزة للبدء بسرعة في مشروعك.",
    step8Title: "8. تحميل ملف",
    step8Desc: "يمكنك تحميل ملف HTML موجود لتحريره في التطبيق.",
    step9Title: "9. وضع التركيز",
    step9Desc: "استخدم وضع التركيز لإخفاء كل شيء ما عدا المحرر للتركيز على كتابة الكود.",

    // About
    about: "عن التطبيق",
    aboutDesc: "DAG Code هو تطبيق لفصل وتحرير أكواد HTML و CSS و JavaScript مع معاينة مباشرة للنتائج.",
    developer: "تم صنعه بواسطة سفيان داغر",

    // Examples
    basicExample: "مثال بسيط",
    basicExampleDesc: "صفحة HTML بسيطة مع CSS وجافا سكريبت",
    animationExample: "رسوم متحركة",
    animationExampleDesc: "مثال للرسوم المتحركة باستخدام CSS",
    responsiveExample: "تصميم متجاوب",
    responsiveExampleDesc: "مثال لتصميم متجاوب مع مختلف أحجام الشاشات",
    darkModeExample: "الوضع المظلم",
    darkModeExampleDesc: "مثال للتبديل بين الوضع المظلم والفاتح",
    gridLayoutExample: "تخطيط الشبكة",
    gridLayoutExampleDesc: "مثال لتخطيط الشبكة باستخدام CSS Grid",

    // Customization
    customizeTitle: "تخصيص المظهر",
    customizeDesc: "تغيير ألوان ومظهر التطبيق",
    themes: "السمات",
    defaultTheme: "الافتراضي",
    darkTheme: "داكن",
    lightTheme: "فاتح",
    blueTheme: "أزرق",
    purpleTheme: "بنفسجي",
    greenTheme: "أخضر",
    customTheme: "مخصص",
    primaryColor: "اللون الرئيسي",
    secondaryColor: "اللون الثانوي",
    backgroundColor: "لون الخلفية",
    textColor: "لون النص",
    resetColors: "إعادة تعيين الألوان",
    applyTheme: "تطبيق السمة",

    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    username: "اسم المستخدم",
    editProfile: "تعديل الملف الشخصي",
    saveChanges: "حفظ التغييرات",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    logoutSuccess: "تم تسجيل الخروج بنجاح",
    profileUpdated: "تم تحديث الملف الشخصي",
    chooseAvatar: "اختر صورة شخصية",
    closeAvatarSelector: "إغلاق",
    gradientColor: "تدرج",
    sunsetTheme: "غروب الشمس",
    oceanTheme: "محيط",
    forestTheme: "غابة",
    midnightTheme: "منتصف الليل",
  },
}

// Avatar images
const AVATARS = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
]

// Example templates
const EXAMPLES = {
  basic: {
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Basic Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2563eb;
    }
    button {
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #1d4ed8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World!</h1>
    <p>This is a simple code example.</p>
    <button id="clickMe">Click Me</button>
  </div>

  <script>
    document.getElementById('clickMe').addEventListener('click', function() {
      alert('You clicked the button!');
    });
  </script>
</body>
</html>`,
  },
  animation: {
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Animation Example</title>
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #1a1a2e;
    }
    .box {
      width: 100px;
      height: 100px;
      background: linear-gradient(45deg, #ff6b6b, #6b47ff);
      border-radius: 10px;
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-100px) rotate(180deg);
      }
    }
  </style>
</head>
<body>
  <div class="box"></div>
</body>
</html>`,
  },
  responsive: {
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Responsive Design</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      width: 100%;
      padding: 15px;
    }
    header {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 1rem;
      text-align: center;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
      width: 100%;
    }
    
    /* For medium screens */
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
        margin: 0 auto;
      }
      .card {
        width: calc(50% - 10px);
        margin-right: 20px;
      }
      .card:nth-child(2n) {
        margin-right: 0;
      }
    }
    
    /* For large screens */
    @media (min-width: 1024px) {
      .container {
        max-width: 960px;
      }
      .card {
        width: calc(33.333% - 14px);
      }
      .card:nth-child(2n) {
        margin-right: 20px;
      }
      .card:nth-child(3n) {
        margin-right: 0;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Responsive Design</h1>
    <p>Resize the window to see the changes</p>
  </header>
  
  <div class="container">
    <div class="content">
      <div class="card">
        <h2>Card 1</h2>
        <p>This is an example of a responsive card for different screen sizes.</p>
      </div>
      <div class="card">
        <h2>Card 2</h2>
        <p>This is an example of a responsive card for different screen sizes.</p>
      </div>
      <div class="card">
        <h2>Card 3</h2>
        <p>This is an example of a responsive card for different screen sizes.</p>
      </div>
      <div class="card">
        <h2>Card 4</h2>
        <p>This is an example of a responsive card for different screen sizes.</p>
      </div>
      <div class="card">
        <h2>Card 5</h2>
        <p>This is an example of a responsive card for different screen sizes.</p>
      </div>
      <div class="card">
        <h2>Card 6</h2>
        <p>This is an example of a responsive card for different screen sizes.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
  },
  darkMode: {
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Dark Mode</title>
  <style>
    :root {
      --bg-color: #ffffff;
      --text-color: #333333;
      --card-bg: #f5f5f5;
      --button-bg: #4a6cf7;
      --button-text: white;
    }
    
    .dark-mode {
      --bg-color: #121212;
      --text-color: #e0e0e0;
      --card-bg: #1e1e1e;
      --button-bg: #6d8dff;
      --button-text: #ffffff;
    }
    
    body {
      font-family: Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: all 0.3s ease;
      margin: 0;
      padding: 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .toggle-btn {
      background-color: var(--button-bg);
      color: var(--button-text);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .card {
      background-color: var(--card-bg);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dark Mode / Light Mode</h1>
      <button class="toggle-btn" onclick="toggleDarkMode()">Toggle Mode</button>
    </div>
    
    <div class="card">
      <h2>Hello World!</h2>
      <p>This is an example of toggling between dark and light modes using CSS and JavaScript.</p>
    </div>
    
    <div class="card">
      <h2>How does it work?</h2>
      <p>CSS variables are used to store colors, which are then toggled when the button is clicked.</p>
    </div>
  </div>

  <script>
    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
    }
  </script>
</body>
</html>`,
  },
  gridLayout: {
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Grid Layout</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f8f9fa;
    }
    
    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
      gap: 15px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      grid-column: 1 / -1;
      background-color: #6d28d9;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    
    .sidebar {
      grid-column: 1 / 2;
      grid-row: 2 / 4;
      background-color: #8b5cf6;
      color: white;
      padding: 20px;
      border-radius: 8px;
    }
    
    .main {
      grid-column: 2 / -1;
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .card {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .footer {
      grid-column: 1 / -1;
      background-color: #4c1d95;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .grid-container {
        grid-template-columns: 1fr;
      }
      
      .sidebar {
        grid-column: 1;
        grid-row: auto;
      }
      
      .main {
        grid-column: 1;
      }
    }
  </style>
</head>
<body>
  <div class="grid-container">
    <header class="header">
      <h1>CSS Grid Layout</h1>
    </header>
    
    <aside class="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
      </ul>
    </aside>
    
    <main class="main">
      <h2>Main Content</h2>
      <p>This is an example of grid layout using CSS Grid. You can resize the window to see how the layout adapts to different screen sizes.</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
        <div class="card">
          <h3>Card 1</h3>
          <p>Content of the first card</p>
        </div>
        <div class="card">
          <h3>Card 2</h3>
          <p>Content of the second card</p>
        </div>
        <div class="card">
          <h3>Card 3</h3>
          <p>Content of the third card</p>
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <p>All rights reserved &copy; 2023</p>
    </footer>
  </div>
</body>
</html>`,
  },
}

// Predefined themes
const THEMES = {
  default: {
    primary: "#3b82f6",
    secondary: "#6366f1",
    background: "#18181b",
    text: "#f4f4f5",
    gradient: "linear-gradient(to right, #3b82f6, #6366f1)",
  },
  dark: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    background: "#09090b",
    text: "#f4f4f5",
    gradient: "linear-gradient(to right, #6366f1, #8b5cf6)",
  },
  light: {
    primary: "#3b82f6",
    secondary: "#6366f1",
    background: "#f4f4f5",
    text: "#18181b",
    gradient: "linear-gradient(to right, #3b82f6, #6366f1)",
  },
  blue: {
    primary: "#0ea5e9",
    secondary: "#3b82f6",
    background: "#0f172a",
    text: "#f8fafc",
    gradient: "linear-gradient(to right, #0ea5e9, #3b82f6)",
  },
  purple: {
    primary: "#a855f7",
    secondary: "#d946ef",
    background: "#1e1b4b",
    text: "#f5f3ff",
    gradient: "linear-gradient(to right, #a855f7, #d946ef)",
  },
  green: {
    primary: "#10b981",
    secondary: "#059669",
    background: "#064e3b",
    text: "#ecfdf5",
    gradient: "linear-gradient(to right, #10b981, #059669)",
  },
  sunset: {
    primary: "#f97316",
    secondary: "#ef4444",
    background: "#27272a",
    text: "#fafafa",
    gradient: "linear-gradient(to right, #f97316, #ef4444)",
  },
  ocean: {
    primary: "#06b6d4",
    secondary: "#0284c7",
    background: "#0c4a6e",
    text: "#e0f2fe",
    gradient: "linear-gradient(to right, #06b6d4, #0284c7)",
  },
  forest: {
    primary: "#22c55e",
    secondary: "#16a34a",
    background: "#14532d",
    text: "#dcfce7",
    gradient: "linear-gradient(to right, #22c55e, #16a34a)",
  },
  midnight: {
    primary: "#4f46e5",
    secondary: "#7c3aed",
    background: "#020617",
    text: "#e0e7ff",
    gradient: "linear-gradient(to right, #4f46e5, #7c3aed)",
  },
}

// Create a helper component for mixed text
const MixedText = ({ text, className = "" }: { text: string; className?: string }) => {
  // Split text by spaces
  const words = text.split(" ")

  return (
    <span className={`mixed-text ${className}`}>
      {words.map((word, index) => {
        // Check if word contains only Latin characters
        const isLatin = /^[A-Za-z0-9\-_]+$/.test(word)

        // If it's a Latin word, wrap it in a span with appropriate direction
        if (isLatin) {
          return (
            <span key={index} className="latin-text">
              {word}{" "}
            </span>
          )
        }

        // Otherwise return the word as is
        return (
          <span key={index} className="bidi-isolate">
            {word}{" "}
          </span>
        )
      })}
    </span>
  )
}

export default function Home() {
  // State variables
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [combinedCode, setCombinedCode] = useState("")
  const [htmlCode, setHtmlCode] = useState("")
  const [cssCode, setCssCode] = useState("")
  const [jsCode, setJsCode] = useState("")
  const [activeTab, setActiveTab] = useState("html")
  const [isProcessed, setIsProcessed] = useState(false)
  const [collapsed, setCollapsed] = useState({
    html: false,
    css: false,
    js: false,
  })
  const [projectName, setProjectName] = useState("New Project")
  const [savedProjects, setSavedProjects] = useState<{ [key: string]: { html: string; css: string; js: string } }>({})
  const [previewKey, setPreviewKey] = useState(0) // Add a key to force re-render
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExamplesOpen, setIsExamplesOpen] = useState(false)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
  const [isSavedProjectsOpen, setIsSavedProjectsOpen] = useState(false)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false)

  // User state
  const [user, setUser] = useState<{
    loggedIn: boolean
    name: string
    image: string
  }>({
    loggedIn: false,
    name: "Guest",
    image: "/placeholder.svg?height=32&width=32",
  })
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  // Theme state
  const [selectedTheme, setSelectedTheme] = useState("default")
  const [customColors, setCustomColors] = useState({
    primary: THEMES.default.primary,
    secondary: THEMES.default.secondary,
    background: THEMES.default.background,
    text: THEMES.default.text,
    gradient: THEMES.default.gradient,
  })
  const [currentTheme, setCurrentTheme] = useState(THEMES.default)

  // Get translations based on current language
  const t = translations[language]

  // Refs
  const previewIframeRef = useRef<HTMLIFrameElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved projects and check welcome screen timing
  useEffect(() => {
    try {
      // Load saved projects
      const savedData = localStorage.getItem("dagCodeProjects")
      if (savedData) {
        setSavedProjects(JSON.parse(savedData))
      }

      // Load language setting
      const savedLanguage = localStorage.getItem("dagCodeLanguage")
      if (savedLanguage) {
        setLanguage(savedLanguage as "en" | "ar")
      }

      // Check if welcome screen should be shown
      const lastWelcome = localStorage.getItem("lastWelcomeShown")
      const now = new Date().getTime()

      if (!lastWelcome || now - Number.parseInt(lastWelcome) > 12 * 60 * 60 * 1000) {
        setShowWelcome(true)
        localStorage.setItem("lastWelcomeShown", now.toString())

        // Hide welcome screen after 5 seconds
        setTimeout(() => {
          setShowWelcome(false)
        }, 5000)
      }

      // Load theme settings
      const savedTheme = localStorage.getItem("dagCodeTheme")
      if (savedTheme) {
        const themeData = JSON.parse(savedTheme)
        setSelectedTheme(themeData.name)
        if (themeData.name === "custom") {
          setCustomColors(themeData.colors)
          setCurrentTheme(themeData.colors)
        } else {
          setCurrentTheme(THEMES[themeData.name as keyof typeof THEMES])
        }
      }

      // Load user data
      const savedUser = localStorage.getItem("dagCodeUser")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error loading saved data:", error)
    }
  }, [])

  // Apply theme
  const applyTheme = (themeName: string) => {
    if (themeName === "custom") {
      setCurrentTheme(customColors)
      localStorage.setItem(
        "dagCodeTheme",
        JSON.stringify({
          name: "custom",
          colors: customColors,
        }),
      )
    } else {
      setCurrentTheme(THEMES[themeName as keyof typeof THEMES])
      localStorage.setItem(
        "dagCodeTheme",
        JSON.stringify({
          name: themeName,
        }),
      )
    }
    setSelectedTheme(themeName)
  }

  // Function to separate code into HTML, CSS, and JS
  const separateCode = () => {
    try {
      if (!combinedCode.trim()) {
        toast({
          title: t.errorEnterCode,
          variant: "destructive",
          duration: 5000,
        })
        return
      }

      // Extract HTML
      const htmlRegex = /<html[\s\S]*?<\/html>/i
      const htmlMatch = combinedCode.match(htmlRegex)
      let extractedHtml = htmlMatch ? htmlMatch[0] : ""

      if (!extractedHtml) {
        // If no full HTML document, look for body content
        const bodyRegex = /<body[\s\S]*?<\/body>/i
        const bodyMatch = combinedCode.match(bodyRegex)

        if (bodyMatch) {
          extractedHtml = bodyMatch[0]
        } else {
          // If no body tag, assume everything not in style or script tags is HTML
          extractedHtml = combinedCode
            .replace(/<style[\s\S]*?<\/style>/gi, "")
            .replace(/<script[\s\S]*?<\/script>/gi, "")
            .trim()
        }
      }

      // Extract CSS
      const cssRegex = /<style[\s\S]*?>([\s\S]*?)<\/style>/gi
      const cssMatches = [...combinedCode.matchAll(cssRegex)]
      const extractedCss = cssMatches.map((match) => match[1]).join("\n\n")

      // Extract JavaScript
      const jsRegex = /<script[\s\S]*?>([\s\S]*?)<\/script>/gi
      const jsMatches = [...combinedCode.matchAll(jsRegex)]
      const extractedJs = jsMatches.map((match) => match[1]).join("\n\n")

      setHtmlCode(extractedHtml)
      setCssCode(extractedCss)
      setJsCode(extractedJs)
      setIsProcessed(true)

      // Set the first tab as active
      setActiveTab("html")

      // Update preview with a slight delay to ensure state is updated
      setTimeout(() => {
        updatePreview()
        // Force re-render of preview
        setPreviewKey((prev) => prev + 1)
      }, 100)

      toast({
        title: t.successSeparated,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error separating code:", error)
      toast({
        title: t.errorSeparating,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to update the preview
  const updatePreview = () => {
    if (!previewIframeRef.current) return

    try {
      // Create a complete HTML document
      const fullHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>${jsCode}</script>
  </body>
</html>
      `.trim()

      // Use document.write for direct rendering
      const iframe = previewIframeRef.current
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document

      if (iframeDoc) {
        iframeDoc.open()
        iframeDoc.write(fullHtml)
        iframeDoc.close()
      } else {
        console.error("Could not access iframe document")
        toast({
          title: "Error in preview",
          description: "Could not access iframe document.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error("Error updating preview:", error)
      toast({
        title: "Error updating preview",
        description: "An error occurred while updating the live preview.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Update preview whenever code changes and isProcessed is true
  useEffect(() => {
    if (isProcessed) {
      updatePreview()
    }
  }, [htmlCode, cssCode, jsCode, isProcessed, previewKey])

  // Update preview when switching to preview tab
  useEffect(() => {
    if (activeTab === "preview" && isProcessed) {
      updatePreview()
      setPreviewKey((prev) => prev + 1) // Force re-render
    }
  }, [activeTab])

  // Function to download code
  const downloadCode = (type: "html" | "css" | "js") => {
    const codeMap = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
    }

    const fileMap = {
      html: "index.html",
      css: "style.css",
      js: "script.js",
    }

    try {
      // Create a Blob with the code content
      const blob = new Blob([codeMap[type]], { type: "text/plain" })
    
      // For mobile devices, use a different approach
      if (isMobile) {
        // Create a temporary URL
        const url = URL.createObjectURL(blob)
        
        // Create a hidden link and trigger it programmatically
        const link = document.createElement("a")
        link.href = url
        link.download = fileMap[type]
        document.body.appendChild(link)
        link.click()
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }, 100)
      } else {
        // For desktop, use the standard approach
        const a = document.createElement("a")
        a.href = URL.createObjectURL(blob)
        a.download = fileMap[type]
        a.style.display = "none"
        document.body.appendChild(a)
        a.click()
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(a.href)
        }, 100)
      }

      toast({
        title: t.successDownload,
        description: `${fileMap[type]} ${language === "en" ? "downloaded successfully" : "تم تنزيله بنجاح"}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error downloading file:", error)
      toast({
        title: t.errorDownload,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to download the full project
  const downloadFullProject = () => {
    try {
      // Create a complete HTML document
      const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <style>
${cssCode}
    </style>
  </head>
  <body>
${htmlCode}
    <script>
${jsCode}
    </script>
  </body>
</html>`

      // Create a Blob with the HTML content
      const blob = new Blob([fullHtml], { type: "text/html" })
    
      // For mobile devices, use a different approach
      if (isMobile) {
        // Create a temporary URL
        const url = URL.createObjectURL(blob)
        
        // Create a hidden link and trigger it programmatically
        const link = document.createElement("a")
        link.href = url
        link.download = `${projectName}.html`
        document.body.appendChild(link)
        link.click()
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }, 100)
      } else {
        // For desktop, use the standard approach
        const a = document.createElement("a")
        a.href = URL.createObjectURL(blob)
        a.download = `${projectName}.html`
        a.style.display = "none"
        document.body.appendChild(a)
        a.click()
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(a.href)
        }, 100)
      }

      toast({
        title: t.successDownload,
        description: `${projectName}.html ${language === "en" ? "downloaded successfully" : "تم تنزيله بنجاح"}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error downloading project:", error)
      toast({
        title: t.errorDownload,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to toggle collapse state
  const toggleCollapse = (tab: "html" | "css" | "js") => {
    setCollapsed((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }))
  }

  // Function to copy code to clipboard
  const copyToClipboard = (type: "html" | "css" | "js") => {
    try {
      const codeMap = {
        html: htmlCode,
        css: cssCode,
        js: jsCode,
      }

      navigator.clipboard.writeText(codeMap[type])

      toast({
        title: t.successCopy,
        description: `${type.toUpperCase()} ${language === "en" ? "code copied to clipboard" : "تم نسخ الكود إلى الحافظة"}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      toast({
        title: t.errorCopy,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to save project
  const saveProject = () => {
    try {
      if (!projectName.trim()) {
        toast({
          title: t.errorSaveName,
          variant: "destructive",
          duration: 5000,
        })
        return
      }

      const newProjects = {
        ...savedProjects,
        [projectName]: {
          html: htmlCode,
          css: cssCode,
          js: jsCode,
        },
      }

      setSavedProjects(newProjects)
      localStorage.setItem("dagCodeProjects", JSON.stringify(newProjects))
      setIsSaveDialogOpen(false)

      toast({
        title: t.successSave,
        description: `"${projectName}" ${language === "en" ? "saved successfully" : "تم حفظه بنجاح"}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        title: t.errorSave,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to load project
  const loadProject = (name: string) => {
    try {
      const project = savedProjects[name]
      if (project) {
        setHtmlCode(project.html)
        setCssCode(project.css)
        setJsCode(project.js)
        setProjectName(name)
        setIsProcessed(true)
        setIsSavedProjectsOpen(false)

        toast({
          title: t.successLoad,
          description: `"${name}" ${language === "en" ? "loaded successfully" : "تم تحميله بنجاح"}.`,
          duration: 5000,
        })

        // Update preview with a slight delay
        setTimeout(() => {
          updatePreview()
          setPreviewKey((prev) => prev + 1) // Force re-render
        }, 100)
      }
    } catch (error) {
      console.error("Error loading project:", error)
      toast({
        title: t.errorLoad,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to delete project
  const deleteProject = (name: string) => {
    try {
      const { [name]: _, ...restProjects } = savedProjects
      setSavedProjects(restProjects)
      localStorage.setItem("dagCodeProjects", JSON.stringify(restProjects))

      toast({
        title: t.successDelete,
        description: `"${name}" ${language === "en" ? "deleted successfully" : "تم حذفه بنجاح"}.`,
        duration: 5000,
      })
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        title: t.errorDelete,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        setCombinedCode(content)

        toast({
          title: t.successUpload,
          description: `"${file.name}" ${language === "en" ? "uploaded successfully" : "تم تحميله بنجاح"}.`,
          duration: 5000,
        })
      } catch (error) {
        console.error("Error reading file:", error)
        toast({
          title: t.errorUpload,
          variant: "destructive",
          duration: 5000,
        })
      }
    }
    reader.readAsText(file)
  }

  // Function to load example
  const loadExample = (exampleKey: string) => {
    try {
      const example = EXAMPLES[exampleKey as keyof typeof EXAMPLES]
      if (example) {
        setCombinedCode(example.code)
        setIsExamplesOpen(false)

        toast({
          title: t.successExample,
          duration: 5000,
        })
      }
    } catch (error) {
      console.error("Error loading example:", error)
      toast({
        title: t.errorExample,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Function to format code
  const formatCode = (type: "html" | "css" | "js") => {
    try {
      // Very simple formatting - just add indentation and line breaks
      if (type === "html") {
        // Simple HTML formatting
        const formatted = htmlCode
          .replace(/></g, ">\n<")
          .replace(/<\/div>/g, "\n</div>")
          .replace(/<div/g, "\n<div")

        setHtmlCode(formatted)
      } else if (type === "css") {
        // Simple CSS formatting
        const formatted = cssCode.replace(/\{/g, " {\n  ").replace(/;/g, ";\n  ").replace(/\}/g, "\n}\n")

        setCssCode(formatted)
      } else if (type === "js") {
        // Simple JS formatting
        const formatted = jsCode.replace(/\{/g, " {\n  ").replace(/;/g, ";\n  ").replace(/\}/g, "\n}\n")

        setJsCode(formatted)
      }

      toast({
        title: t.successFormat,
        description: `${type.toUpperCase()} ${language === "en" ? "code formatted successfully" : "تم تنسيق الكود بنجاح"}.`,
        duration: 5000,
      })

      // Update preview after formatting
      setTimeout(() => {
        updatePreview()
      }, 100)
    } catch (error) {
      console.error("Error formatting code:", error)
      toast({
        title: t.errorFormat,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("dagCodeLanguage", newLanguage)
    // Update project name based on language
    setProjectName(language === "en" ? "مشروع جديد" : "New Project")
  }

  // Toggle focus mode
  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode)
    setIsMenuOpen(false)
  }

  // Update user data
  const updateUser = (userData: Partial<typeof user>) => {
    const newUserData = { ...user, ...userData }
    setUser(newUserData)
    localStorage.setItem("dagCodeUser", JSON.stringify(newUserData))
  }

  // Select avatar
  const selectAvatar = (avatarPath: string) => {
    updateUser({ image: avatarPath })
    setIsAvatarSelectorOpen(false)
  }

  // Determine text direction based on language
  const dir = language === "ar" ? "rtl" : "ltr"

  // Generate dynamic styles based on theme
  const dynamicStyles = {
    primary: currentTheme.primary,
    secondary: currentTheme.secondary,
    background: currentTheme.background,
    text: currentTheme.text,
    gradient: currentTheme.gradient,
  }

  return (
    <main
      className={`min-h-screen flex flex-col mx-auto shadow-xl ${dir}`}
      dir={dir}
      style={{
        backgroundColor: dynamicStyles.background,
        color: dynamicStyles.text,
        maxWidth: isMobile ? "500px" : "100%",
        width: "100%",
      }}
    >
      {/* Welcome Screen */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-zinc-900 p-8 rounded-lg shadow-xl max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              {t.welcomeMessage}
            </h1>
            <p className="text-zinc-300 mb-6">{t.welcomeSubtitle}</p>
            <div className="animate-pulse">
              <div className="w-16 h-16 mx-auto mb-4">
                <img src="/logo.png" alt="DAG Code Logo" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Avatar Selector */}
      {isAvatarSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div
            className="p-6 rounded-lg shadow-xl max-w-md"
            style={{ backgroundColor: dynamicStyles.background, color: dynamicStyles.text }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t.chooseAvatar}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAvatarSelectorOpen(false)}
                style={{ color: dynamicStyles.text }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {AVATARS.map((avatar, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 rounded-lg transition-all ${user.image === avatar ? "ring-2" : ""}`}
                  style={{
                    backgroundColor: `${dynamicStyles.text}10`,
                    ringColor: dynamicStyles.primary,
                  }}
                  onClick={() => selectAvatar(avatar)}
                >
                  <img
                    src={avatar || "/placeholder.svg"}
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-auto rounded-full"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsAvatarSelectorOpen(false)}
                style={{ backgroundColor: dynamicStyles.primary, color: "#ffffff" }}
              >
                {t.closeAvatarSelector}
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isFocusMode && (
        <header
          className="p-3 flex items-center justify-between border-b border-zinc-800 sticky top-0 z-10"
          style={{ borderColor: `${dynamicStyles.text}20` }}
        >
          <div className="flex items-center">
            <img src="/logo.png" alt="DAG Code Logo" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            {user.loggedIn ? (
              <div
                className="flex items-center gap-2 px-2 py-1 rounded-full cursor-pointer"
                onClick={() => setIsLoginOpen(true)}
                style={{ backgroundColor: `${dynamicStyles.text}10` }}
              >
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm" style={{ color: dynamicStyles.text }}>
                  {user.name}
                </span>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLoginOpen(true)}
                style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
              >
                {t.login}
              </Button>
            )}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" style={{ color: dynamicStyles.text }}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t.menu}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={language === "ar" ? "left" : "right"}
                className="border-zinc-800"
                style={{
                  backgroundColor: dynamicStyles.background,
                  color: dynamicStyles.text,
                  borderColor: `${dynamicStyles.text}20`,
                }}
              >
                <SheetHeader>
                  <SheetTitle style={{ color: dynamicStyles.text }}>{t.appName}</SheetTitle>
                  <SheetDescription style={{ color: `${dynamicStyles.text}80` }}>
                    <MixedText text={t.appDescription} />
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsInstructionsOpen(true)
                      setIsMenuOpen(false)
                    }}
                    style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <MixedText text={t.instructions} />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsSavedProjectsOpen(true)
                      setIsMenuOpen(false)
                    }}
                    style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <MixedText text={t.savedProjects} />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsCustomizeOpen(true)
                      setIsMenuOpen(false)
                    }}
                    style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <MixedText text={t.customize} />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsAboutOpen(true)
                      setIsMenuOpen(false)
                    }}
                    style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    <MixedText text={t.about} />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={toggleLanguage}
                    style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                  >
                    <Languages className="mr-2 h-4 w-4" />
                    {language === "en" ? "العربية" : "English"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={toggleFocusMode}
                    style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                  >
                    <Maximize className="mr-2 h-4 w-4" />
                    <MixedText text={t.focusMode} />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      )}

      <div className={`w-full p-2 flex-1 flex flex-col gap-4 overflow-hidden ${isFocusMode ? "pt-0" : ""}`}>
        {isFocusMode && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={toggleFocusMode}
              style={{ color: dynamicStyles.text }}
            >
              <Minimize className="mr-2 h-4 w-4" />
              <MixedText text={t.exitFocusMode} />
            </Button>
          </div>
        )}

        {!isFocusMode && (
          <div className="flex flex-col gap-3 items-start">
            <div className="w-full space-y-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="combined-code" className="text-sm font-medium" style={{ color: dynamicStyles.text }}>
                    <MixedText text={t.combinedCode} />
                  </label>
                  <div className="flex gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                        >
                          <FileUp className="h-3 w-3 mr-1" />
                          <MixedText text={t.uploadFile} />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side={language === "ar" ? "left" : "right"}
                        className="border-zinc-800"
                        style={{
                          backgroundColor: dynamicStyles.background,
                          color: dynamicStyles.text,
                          borderColor: `${dynamicStyles.text}20`,
                        }}
                      >
                        <SheetHeader>
                          <SheetTitle style={{ color: dynamicStyles.text }}>
                            <MixedText text={t.uploadFile} />
                          </SheetTitle>
                          <SheetDescription style={{ color: `${dynamicStyles.text}80` }}>
                            <MixedText text={t.uploadFileDesc} />
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4 mt-4">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".html,.htm"
                            onChange={handleFileUpload}
                            className="block w-full text-sm"
                            style={{ color: `${dynamicStyles.text}80` }}
                          />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Sheet open={isExamplesOpen} onOpenChange={setIsExamplesOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                        >
                          <Code className="h-3 w-3 mr-1" />
                          <MixedText text={t.examples} />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side={language === "ar" ? "left" : "right"}
                        className="border-zinc-800 overflow-y-auto"
                        style={{
                          backgroundColor: dynamicStyles.background,
                          color: dynamicStyles.text,
                          borderColor: `${dynamicStyles.text}20`,
                        }}
                      >
                        <SheetHeader>
                          <SheetTitle style={{ color: dynamicStyles.text }}>
                            <MixedText text={t.examples} />
                          </SheetTitle>
                          <SheetDescription style={{ color: `${dynamicStyles.text}80` }}>
                            <MixedText text={t.examplesDesc} />
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid grid-cols-1 gap-4 py-4 mt-4">
                          <Card
                            className="overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer"
                            onClick={() => loadExample("basic")}
                            style={{
                              backgroundColor: `${dynamicStyles.text}10`,
                              borderColor: `${dynamicStyles.text}20`,
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Code className="h-4 w-4" style={{ color: dynamicStyles.primary }} />
                                <h3 className="font-medium" style={{ color: dynamicStyles.text }}>
                                  <MixedText text={t.basicExample} />
                                </h3>
                              </div>
                              <p className="text-sm" style={{ color: `${dynamicStyles.text}80` }}>
                                <MixedText text={t.basicExampleDesc} />
                              </p>
                            </CardContent>
                          </Card>

                          <Card
                            className="overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer"
                            onClick={() => loadExample("animation")}
                            style={{
                              backgroundColor: `${dynamicStyles.text}10`,
                              borderColor: `${dynamicStyles.text}20`,
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Palette className="h-4 w-4" style={{ color: dynamicStyles.secondary }} />
                                <h3 className="font-medium" style={{ color: dynamicStyles.text }}>
                                  <MixedText text={t.animationExample} />
                                </h3>
                              </div>
                              <p className="text-sm" style={{ color: `${dynamicStyles.text}80` }}>
                                <MixedText text={t.animationExampleDesc} />
                              </p>
                            </CardContent>
                          </Card>

                          <Card
                            className="overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer"
                            onClick={() => loadExample("responsive")}
                            style={{
                              backgroundColor: `${dynamicStyles.text}10`,
                              borderColor: `${dynamicStyles.text}20`,
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Code className="h-4 w-4" style={{ color: dynamicStyles.primary }} />
                                <h3 className="font-medium" style={{ color: dynamicStyles.text }}>
                                  <MixedText text={t.responsiveExample} />
                                </h3>
                              </div>
                              <p className="text-sm" style={{ color: `${dynamicStyles.text}80` }}>
                                <MixedText text={t.responsiveExampleDesc} />
                              </p>
                            </CardContent>
                          </Card>

                          <Card
                            className="overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer"
                            onClick={() => loadExample("darkMode")}
                            style={{
                              backgroundColor: `${dynamicStyles.text}10`,
                              borderColor: `${dynamicStyles.text}20`,
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Palette className="h-4 w-4" style={{ color: dynamicStyles.secondary }} />
                                <h3 className="font-medium" style={{ color: dynamicStyles.text }}>
                                  <MixedText text={t.darkModeExample} />
                                </h3>
                              </div>
                              <p className="text-sm" style={{ color: `${dynamicStyles.text}80` }}>
                                <MixedText text={t.darkModeExampleDesc} />
                              </p>
                            </CardContent>
                          </Card>

                          <Card
                            className="overflow-hidden hover:border-zinc-500 transition-colors cursor-pointer"
                            onClick={() => loadExample("gridLayout")}
                            style={{
                              backgroundColor: `${dynamicStyles.text}10`,
                              borderColor: `${dynamicStyles.text}20`,
                            }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Grid className="h-4 w-4" style={{ color: dynamicStyles.primary }} />
                                <h3 className="font-medium" style={{ color: dynamicStyles.text }}>
                                  <MixedText text={t.gridLayoutExample} />
                                </h3>
                              </div>
                              <p className="text-sm" style={{ color: `${dynamicStyles.text}80` }}>
                                <MixedText text={t.gridLayoutExampleDesc} />
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
                <Textarea
                  id="combined-code"
                  value={combinedCode}
                  onChange={(e) => setCombinedCode(e.target.value)}
                  placeholder={t.placeholderText}
                  className={`min-h-[180px] font-mono text-sm ${isMobile ? "" : "min-h-[300px]"}`}
                  style={{
                    backgroundColor: `${dynamicStyles.text}10`,
                    borderColor: `${dynamicStyles.text}20`,
                    color: dynamicStyles.text,
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={separateCode}
                  className="text-white font-medium px-6 py-2 rounded-md transition-all"
                  style={{
                    background: dynamicStyles.gradient,
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  <MixedText text={t.separateAndView} />
                </Button>

                {isProcessed && (
                  <>
                    <Sheet open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          <MixedText text={t.saveProject} />
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side={language === "ar" ? "left" : "right"}
                        className="border-zinc-800"
                        style={{
                          backgroundColor: dynamicStyles.background,
                          color: dynamicStyles.text,
                          borderColor: `${dynamicStyles.text}20`,
                        }}
                      >
                        <SheetHeader>
                          <SheetTitle style={{ color: dynamicStyles.text }}>
                            <MixedText text={t.saveProjectTitle} />
                          </SheetTitle>
                          <SheetDescription style={{ color: `${dynamicStyles.text}80` }}>
                            <MixedText text={t.saveProjectDesc} />
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4 mt-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="project-name"
                              className={`${language === "ar" ? "text-right" : "text-left"}`}
                              style={{ color: dynamicStyles.text }}
                            >
                              <MixedText text={t.projectName} />
                            </Label>
                            <Input
                              id="project-name"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                              className="col-span-3"
                              style={{
                                backgroundColor: `${dynamicStyles.text}10`,
                                borderColor: `${dynamicStyles.text}20`,
                                color: dynamicStyles.text,
                              }}
                            />
                          </div>
                          <Button
                            onClick={saveProject}
                            className="mt-4"
                            style={{
                              backgroundColor: dynamicStyles.primary,
                              color: "#ffffff",
                            }}
                          >
                            <MixedText text={t.save} />
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Button
                      variant="outline"
                      onClick={downloadFullProject}
                      style={{ borderColor: `${dynamicStyles.text}20`, color: dynamicStyles.text }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <MixedText text={t.downloadProject} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {isProcessed && (
          <div className="flex-1 flex flex-col gap-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList
                className="w-full p-1 grid grid-cols-4"
                style={{
                  backgroundColor: `${dynamicStyles.text}10`,
                  borderColor: `${dynamicStyles.text}20`,
                }}
              >
                <TabsTrigger
                  value="html"
                  className="data-[state=active]:text-white"
                  style={{
                    color: dynamicStyles.text,
                    background: activeTab === "html" ? dynamicStyles.gradient : "transparent",
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  HTML
                </TabsTrigger>
                <TabsTrigger
                  value="css"
                  className="data-[state=active]:text-white"
                  style={{
                    color: dynamicStyles.text,
                    background: activeTab === "css" ? dynamicStyles.gradient : "transparent",
                  }}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  CSS
                </TabsTrigger>
                <TabsTrigger
                  value="js"
                  className="data-[state=active]:text-white"
                  style={{
                    color: dynamicStyles.text,
                    background: activeTab === "js" ? dynamicStyles.gradient : "transparent",
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  JavaScript
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:text-white"
                  style={{
                    color: dynamicStyles.text,
                    background: activeTab === "preview" ? dynamicStyles.gradient : "transparent",
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  <MixedText text={t.preview} />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="mt-3">
                <div
                  className="rounded-md overflow-hidden"
                  style={{
                    backgroundColor: `${dynamicStyles.text}10`,
                    borderColor: `${dynamicStyles.text}20`,
                  }}
                >
                  <div
                    className="flex items-center justify-between p-2 border-b"
                    style={{ borderColor: `${dynamicStyles.text}20` }}
                  >
                    <h3 className="font-medium flex items-center" style={{ color: dynamicStyles.primary }}>
                      <FileText className="mr-2 h-4 w-4" />
                      <MixedText text={t.htmlFile} />
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => formatCode("html")}
                        className="h-8 w-8 hover:text-white"
                        title={t.format}
                        style={{ color: dynamicStyles.text }}
                      >
                        <Wand2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("html")}
                        className="h-8 w-8 hover:text-white"
                        title={t.copy}
                        style={{ color: dynamicStyles.text }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCollapse("html")}
                        className="h-8 w-8 hover:text-white"
                        title={collapsed.html ? t.expand : t.collapse}
                        style={{ color: dynamicStyles.text }}
                      >
                        {collapsed.html ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadCode("html")}
                        className="h-8 w-8 hover:text-white"
                        title={t.download}
                        style={{ color: dynamicStyles.primary }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!collapsed.html && (
                    <Textarea
                      value={htmlCode}
                      onChange={(e) => {
                        setHtmlCode(e.target.value)
                        updatePreview()
                      }}
                      className={`min-h-[180px] w-full border-0 rounded-none font-mono text-sm p-4 ${
                        isMobile ? "" : "min-h-[400px]"
                      }`}
                      style={{
                        backgroundColor: `${dynamicStyles.text}05`,
                        color: dynamicStyles.text,
                      }}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="css" className="mt-3">
                <div
                  className="rounded-md overflow-hidden"
                  style={{
                    backgroundColor: `${dynamicStyles.text}10`,
                    borderColor: `${dynamicStyles.text}20`,
                  }}
                >
                  <div
                    className="flex items-center justify-between p-2 border-b"
                    style={{ borderColor: `${dynamicStyles.text}20` }}
                  >
                    <h3 className="font-medium flex items-center" style={{ color: dynamicStyles.secondary }}>
                      <FileCode className="mr-2 h-4 w-4" />
                      <MixedText text={t.cssFile} />
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => formatCode("css")}
                        className="h-8 w-8 hover:text-white"
                        title={t.format}
                        style={{ color: dynamicStyles.text }}
                      >
                        <Wand2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("css")}
                        className="h-8 w-8 hover:text-white"
                        title={t.copy}
                        style={{ color: dynamicStyles.text }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCollapse("css")}
                        className="h-8 w-8 hover:text-white"
                        title={collapsed.css ? t.expand : t.collapse}
                        style={{ color: dynamicStyles.text }}
                      >
                        {collapsed.css ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadCode("css")}
                        className="h-8 w-8 hover:text-white"
                        title={t.download}
                        style={{ color: dynamicStyles.secondary }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!collapsed.css && (
                    <Textarea
                      value={cssCode}
                      onChange={(e) => {
                        setCssCode(e.target.value)
                        updatePreview()
                      }}
                      className={`min-h-[180px] w-full border-0 rounded-none font-mono text-sm p-4 ${
                        isMobile ? "" : "min-h-[400px]"
                      }`}
                      style={{
                        backgroundColor: `${dynamicStyles.text}05`,
                        color: dynamicStyles.text,
                      }}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="js" className="mt-3">
                <div
                  className="rounded-md overflow-hidden"
                  style={{
                    backgroundColor: `${dynamicStyles.text}10`,
                    borderColor: `${dynamicStyles.text}20`,
                  }}
                >
                  <div
                    className="flex items-center justify-between p-2 border-b"
                    style={{ borderColor: `${dynamicStyles.text}20` }}
                  >
                    <h3 className="font-medium flex items-center" style={{ color: dynamicStyles.primary }}>
                      <Code className="mr-2 h-4 w-4" />
                      <MixedText text={t.jsFile} />
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => formatCode("js")}
                        className="h-8 w-8 hover:text-white"
                        title={t.format}
                        style={{ color: dynamicStyles.text }}
                      >
                        <Wand2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard("js")}
                        className="h-8 w-8 hover:text-white"
                        title={t.copy}
                        style={{ color: dynamicStyles.text }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleCollapse("js")}
                        className="h-8 w-8 hover:text-white"
                        title={collapsed.js ? t.expand : t.collapse}
                        style={{ color: dynamicStyles.text }}
                      >
                        {collapsed.js ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadCode("js")}
                        className="h-8 w-8 hover:text-white"
                        title={t.download}
                        style={{ color: dynamicStyles.primary }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {!collapsed.js && (
                    <Textarea
                      value={jsCode}
                      onChange={(e) => {
                        setJsCode(e.target.value)
                        updatePreview()
                      }}
                      className={`min-h-[180px] w-full border-0 rounded-none font-mono text-sm p-4 ${
                        isMobile ? "" : "min-h-[400px]"
                      }`}
                      style={{
                        backgroundColor: `${dynamicStyles.text}05`,
                        color: dynamicStyles.text,
                      }}
                    />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-3">
                <div
                  className="rounded-md overflow-hidden"
                  style={{
                    backgroundColor: `${dynamicStyles.text}10`,
                    borderColor: `${dynamicStyles.text}20`,
                  }}
                >
                  <div className="p-2 border-b" style={{ borderColor: `${dynamicStyles.text}20` }}>
                    <h3 className="font-medium flex items-center" style={{ color: dynamicStyles.secondary }}>
                      <Eye className="mr-2 h-4 w-4" />
                      <MixedText text={t.preview} />
                    </h3>
                  </div>
                  <div className={`w-full bg-white ${isMobile ? "h-[350px]" : "h-[500px]"}`}>
                    <iframe
                      key={previewKey}
                      ref={previewIframeRef}
                      title="Preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {!isMobile && isProcessed && activeTab !== "preview" && (
        <div className="fixed right-4 top-20 w-[40%] h-[500px] rounded-md overflow-hidden shadow-xl border border-zinc-700 z-10 hidden lg:block">
          <div className="p-2 border-b bg-zinc-800 flex justify-between items-center">
            <h3 className="font-medium flex items-center text-white">
              <Eye className="mr-2 h-4 w-4" />
              <MixedText text={t.preview} />
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("preview")}
              className="h-6 w-6 text-zinc-400 hover:text-white"
            >
              <Maximize className="h-3 w-3" />
            </Button>
          </div>
          <div className="w-full bg-white h-full">
            <iframe
              key={previewKey + 1} // Use a different key to force re-render
              title="Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin"
              srcDoc={`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>${jsCode}</script>
  </body>
</html>
              `}\
