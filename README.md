# Cloud Space

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_App-3b82f6?style=for-the-badge)](https://file-uploader-ntlc.onrender.com/)
[![Code](https://img.shields.io/badge/Code-GitHub_Repo-black?style=for-the-badge)](https://github.com/inebw/file-uploader)

## 📖 Project Overview

**Cloud Space** is a personal file storage application that simulates a file system structure on the web. It allows users to create nested directory trees, upload files, and manage content in a private, session-secured environment.

The application uses a relational database to model a recursive directory structure, coupled with cloud object storage for file persistence.

## 🛠 Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Prisma ORM
- **Views:** EJS (Server-Side Rendering)
- **Authentication:** Passport.js (Local Strategy)
- **Session Management:** `@quixo3/prisma-session-store`
- **Storage:** Multer (Memory Storage) + Supabase
- **Styling:** CSS3 (Custom Grid Layout)

## ✨ Features

- **Recursive Directories:** Supports creating folders within folders to any depth using self-referential database relations.
- **Deep Linking:** Implements wildcard routing (`/home/*splat`) to allow direct access to nested folders via URL.
- **Persistent Sessions:** User sessions are stored in PostgreSQL, ensuring login states persist across server restarts.
- **File Type Detection:** Automatically renders appropriate thumbnails for Images, PDFs, and Videos.
- **Responsive Interface:** A mobile-friendly layout built with CSS Grid.

## 📂 Implementation Details

### Database Schema (Recursion)

To model the file system, the `Dir` (Directory) table references itself. This allows for an infinite tree structure where every folder can act as a parent to another.
