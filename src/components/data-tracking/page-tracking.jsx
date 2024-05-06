import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePostHog } from 'posthog-js/react'

const PageViewTracker = () => {
  const location = useLocation();
  const posthog = usePostHog();

  useEffect(() => {
    try {
      posthog.capture(
        'pageView', {
        'page_url': location.pathname,
      });
    } catch (err) {
      console.log("Analytics Error: ", err);
    }

  }, [location]);

  return null;
};

export default PageViewTracker;