# File Manager (Node.js)

A simple file manager built with **Node.js**, supporting navigation, file manipulation, OS information, hashing, and file compression.  
Implements functionality via **Streams**, **Crypto**, and **Zlib** APIs.

---

## 🚀 Installation & Run

```bash
git clone https://github.com/vitali007tut/file_manager.git
cd file-manager
npm start -- --username=YourName
```

If the username is not provided, the program will greet you as **Anonymous**.

---

## 📂 Project Structure

```
src/
 ├── cli.js             # Main CLI controller
 ├── navigation.js      # File system navigation (cd, up, ls)
 ├── files.js           # Basic file operations (cat, add, rm, etc.)
 ├── os.js              # Operating system info
 ├── hash.js            # Hash calculation (SHA256)
 ├── archive.js         # File compression/decompression (Brotli)
 └── utils.js           # Helper utilities (optional)
```

---

## 🧭 Navigation Commands

| Command | Description | Example |
|----------|--------------|----------|
| `up` | Go to parent directory (cannot go above home directory) | `up` |
| `cd path_to_directory` | Change working directory | `cd src` |
| `ls` | List all files and folders in the current directory | `ls` |

---

## 📄 File Operations

| Command | Description | Example |
|----------|--------------|----------|
| `cat path_to_file` | Read file content using stream and print to console | `cat notes.txt` |
| `add new_file_name` | Create a new empty file in the current directory | `add new.txt` |
| `rn path_to_file new_filename` | Rename file (keep content) | `rn notes.txt notes_old.txt` |
| `cp path_to_file path_to_new_directory` | Copy file using streams | `cp notes.txt ./backup` |
| `mv path_to_file path_to_new_directory` | Move file using streams (copy + delete original) | `mv notes.txt ./backup` |
| `rm path_to_file` | Delete file | `rm temp.txt` |

---

## ⚙️ Operating System Commands

| Command | Description | Example |
|----------|--------------|----------|
| `os --EOL` | Print the system’s End-Of-Line character | `os --EOL` |
| `os --cpus` | Print info about CPUs (model, speed) | `os --cpus` |
| `os --homedir` | Print home directory path | `os --homedir` |
| `os --username` | Print current system username | `os --username` |
| `os --architecture` | Print CPU architecture | `os --architecture` |

---

## 🔐 Hash Calculation

| Command | Description | Example |
|----------|--------------|----------|
| `hash path_to_file` | Calculate and print SHA256 hash of a file | `hash notes.txt` |

---

## 🗜️ Compression & Decompression

| Command | Description | Example |
|----------|--------------|----------|
| `compress path_to_file path_to_destination` | Compress file using Brotli (Streams API) | `compress data.txt ./archive/data.txt.br` |
| `decompress path_to_file path_to_destination` | Decompress Brotli file back to original | `decompress ./archive/data.txt.br ./restored/data.txt` |

---

## 🧩 Notes

- All operations use **asynchronous APIs** and handle errors with `Operation failed`.
- You cannot navigate above the user’s **home directory**.
- After decompression, the restored file is **identical** to the original.

---

## 🧰 Example Session

```bash
Welcome to the File Manager, YourName!
You are currently in C:\\Users\\YourName

> ls
> cd src
> add test.txt
> cat test.txt
> compress test.txt ./archive/test.txt.br
> decompress ./archive/test.txt.br ./restored/test.txt
> hash ./restored/test.txt
> os --cpus
> .exit

Thank you for using File Manager, YourName, goodbye!
```

---

## ⚡ Requirements

- Node.js **v18+**
- Works on Windows, macOS, and Linux
- No external dependencies required
