import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

// Configuration - Consider moving these to environment variables for better security
const APPLICATION_ID = '8746555b-90d8-438e-a089-8204668d2ba8';
const APPLICATION_VERSION = '1.0.0';
const APPLICATION_REGION = 'ap-southeast-2';

const config: AwsRumConfig = {
  sessionSampleRate: 1,
  identityPoolId: "ap-southeast-2:55f4b9f4-c263-4cd2-90a1-6ae066cdeda0",
  endpoint: "https://dataplane.rum.ap-southeast-2.amazonaws.com",
  telemetries: ["performance", "errors", "http"],
  allowCookies: true,
  enableXRay: false,
  disableAutoPageView: true,
};

// Initialize AwsRum
let awsRum: AwsRum | null = null;
try {
  awsRum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
} catch (error) {
  console.error("Error initializing AWS Rum:", error);
}

// Function to record page views (full path)
export const useRecordPageView = () => {
    const location = useLocation();
  
    React.useEffect(() => {
      console.log('logging pageview to cwr: ' + location.pathname);
      if (awsRum) {
        awsRum.recordPageView(location.pathname);
      }
    }, [location]);
  };

// Function to record page views (base path)
export const useRecordPageViewWithoutUserId = () => {
    const location = useLocation();
    const baseLocationPath = location.pathname.split('/').slice(0, -1).join('/'); 
  
    React.useEffect(() => {
      console.log(baseLocationPath);
      if (awsRum) {
        awsRum.recordPageView(baseLocationPath);
      }
    }, [baseLocationPath]); 
  };


//   export const recordCustomMetric = (metricName: string, value: number) => {
//     if (awsRum) {
//       awsRum.recordMetric(metricName, value);
//     }
//   };


  // ErrorBoundary component in TypeScript
export class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error): { hasError: boolean } {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.log('recordingError: ', error);
      if (awsRum) {
        awsRum.recordError(error);
      }
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h1>Something went wrong.</h1>
            <button onClick={() => { window.location.href = '/'; }}>Clear Error</button>
          </div>
        );
      }
  
      return this.props.children;
    }
  }

// Export the AwsRum object
export { awsRum };