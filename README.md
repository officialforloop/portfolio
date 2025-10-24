# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark/light theme support
- **Responsive**: Optimized for all devices and screen sizes
- **Performance**: Built with Next.js 15 for optimal performance
- **TypeScript**: Full type safety throughout the application
- **Docker Ready**: Containerized for easy deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Deployment**: Docker, Docker Compose
- **Icons**: Lucide React

## 🏃‍♂️ Getting Started

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## 🐳 Docker Deployment

### VPS Deployment (Port 1124)

This project is configured to run on port 1124 and includes automated VPS deployment.

### Prerequisites

- Docker and Docker Compose installed on your VPS
- SSH access to your VPS

### Automated Deployment

1. **Make the deployment script executable** (already done):
   ```bash
   chmod +x vps-copy.sh
   ```

2. **Run the deployment script**:
   ```bash
   ./vps-copy.sh
   ```

   The script will:
   - Check if the portfolio folder exists on VPS, create if needed
   - Copy all files except `node_modules`, `.next`, and `.git`
   - Build and run Docker containers
   - Start the application on port 1124

3. **Access your portfolio**:
   ```
   http://84.247.186.191:1124
   ```

### Manual Docker Commands

If you prefer to run Docker commands manually:

```bash
# On your VPS
cd /home/muktar/portfolio

# Stop existing containers
docker-compose down

# Build and start
docker-compose up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── projects/[slug]/    # Dynamic project pages
│   └── ...
├── components/             # Reusable React components
│   ├── ui/                # Base UI components
│   └── ...
├── public/                # Static assets
├── lib/                   # Utility functions
└── ...
```

## 🔧 Configuration

- **Port**: 1124 (configurable via PORT environment variable)
- **Node Environment**: Production
- **Next.js Output**: Standalone for Docker optimization

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed with `npm ci`
2. **Port already in use**: Change the port in `docker-compose.yml`
3. **Permission denied**: Make sure Docker has proper permissions on VPS

### Health Check

The deployment includes a health check that verifies the application is running:
```bash
curl http://localhost:1124
```

## 📝 Environment Variables

- `PORT`: Application port (default: 1124)
- `NODE_ENV`: Node environment (production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
