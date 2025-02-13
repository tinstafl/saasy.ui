# saasy.ui: Your Next.js SaaS Project Starter

## Getting Started 🚀

This guide will help you set up and run your SaaS application development environment quickly and efficiently.

### Infrastructure Binding 🔗

The `bind.sh` script is crucial for connecting your local development environment to the cloud infrastructure:

```shell
# Bind to the default project infrastructure
# -p: Specifies the project identifier
# -r: Sets the AWS region for deployment
./bind.sh -p default-s5g3du4b4f4gz6u -r us-west-2
```

#### What This Command Does:
- Connects your local environment to the specified AWS project
- Configures region-specific settings
- Sets up necessary credentials and access permissions
- Prepares your development environment for cloud interactions

### Running the Development Server 💻

Multiple package managers are supported for starting the development server:

```bash
# npm (Node Package Manager)
npm run dev

# Yarn
yarn dev

# pnpm (performant npm)
pnpm dev

# Bun (modern JavaScript runtime)
bun dev
```

#### Development Server Notes:
- Starts the Next.js development server
- Enables hot reloading for instant feedback
- Runs on `http://localhost:3000` by default
- Open this URL in your browser to view the application

### Accessing Your Application 🌐

After starting the development server, navigate to:
- [http://localhost:3000](http://localhost:3000)

This will display the initial landing page of your SaaS application.

### Deployment with AWS Amplify Hosting 🚀

For comprehensive deployment instructions, refer to the official AWS documentation:
- [AWS Amplify Hosting Next.js Guide](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started-next.html)

AWS Amplify Hosting requires Node.js version 22 or higher for building and deploying applications. To ensure compatibility, you must use a Node version that meets this requirement, either by specifying it in your project settings or by using a custom build image. For more details, refer to the [Amplify Hosting Custom Build Image documentation](https://docs.aws.amazon.com/amplify/latest/userguide/custom-build-image.html).

#### Deployment Highlights:
- Seamless integration with Next.js
- Automatic build and deployment
- Custom domain support
- Continuous deployment from your repository

## Learning Resources 📚

Expand your knowledge and skills with these valuable resources:

### Next.js Documentation
- **Official Documentation**: [Next.js Docs](https://nextjs.org/docs)
    - Comprehensive guide to Next.js features
    - API references
    - Best practices and advanced configurations

### Interactive Learning
- **Next.js Tutorial**: [Learn Next.js](https://nextjs.org/learn)
    - Hands-on, step-by-step tutorial
    - Covers fundamental and advanced concepts
    - Practical exercises and projects

### Project Infrastructure
- **SaaSy Infrastructure Guide**: [Infrastructure Documentation](https://prototype.tinstafl.io/docs/saasy)
    - Deep dive into project-specific infrastructure
    - Architecture overview
    - Deployment strategies
    - Custom configurations

## Pro Tips 💡
- Always keep your dependencies updated
- Use environment-specific configurations
- Leverage Next.js performance optimizations
- Implement proper error handling and logging

Happy Coding! 🎉