# PeerGate

PeerGate is a peer-to-peer file sharing application that allows users to securely upload and download files using unique invite codes. The application consists of a Java Spring Boot backend and a Next.js frontend, providing a modern and responsive user interface.

## Features

- **File Upload**: Upload files securely to the server
- **File Download**: Download files using unique invite codes
- **Responsive UI**: Modern interface that works on desktop and mobile devices
- **Real-time Status**: Track upload and download progress
- **Docker Support**: Easy deployment with Docker and Docker Compose

## Architecture

PeerGate follows a client-server architecture:

### Backend

- **Language**: Java 17
- **Framework**: Spring Boot 2.7.0
- **Server**: Embedded HTTP Server
- **File Storage**: Local file system (configurable)
- **Key Components**:
  - `FileController`: Handles HTTP requests for file operations
  - `FileSharer`: Manages file sharing and tracking
  - `UploadUtils`: Utilities for file upload operations

### Frontend

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4
- **Key Components**:
  - `FileUpload`: Component for handling file uploads
  - `FileDownload`: Component for handling file downloads
  - `InviteCode`: Component for displaying and copying invite codes

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- npm or yarn
- Docker and Docker Compose (optional, for containerized deployment)

### Local Development

#### Backend

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/PeerGate.git
   cd PeerGate
   ```

2. Build the backend
   ```bash
   mvn clean package
   ```

3. Run the backend
   ```bash
   java -jar target/p2p-1.0-SNAPSHOT.jar
   ```

   The backend will start on port 8080 by default.

#### Frontend

1. Navigate to the UI directory
   ```bash
   cd ui
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The frontend will be available at http://localhost:3000.

### Docker Deployment

To deploy the entire application using Docker:

1. Build and start the containers
   ```bash
   docker-compose up -d
   ```

2. Access the application at http://localhost:3000

## Configuration

### Backend Configuration

- **Port**: Set the `PORT` environment variable to change the default port (8080)
- **Upload Directory**: Files are stored in the system's temporary directory by default

### Frontend Configuration

- **API URL**: Set the `NEXT_PUBLIC_API_URL` environment variable to point to your backend server

## Usage

### Uploading Files

1. Navigate to the upload tab
2. Drag and drop files or click to select files
3. Click the "Upload" button
4. Once the upload is complete, an invite code will be displayed
5. Share this invite code with the recipient

### Downloading Files

1. Navigate to the download tab
2. Enter the invite code provided by the sender
3. Click the "Download" button
4. The file will be downloaded to your device

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)