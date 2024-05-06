import posthog from 'posthog-js';

const ClickTracking = (button_name, page_host) => {
    try {
        posthog.capture(
            'buttonClick', {
            'page_host': page_host.href,
            'buttonName': button_name,
        }
        );
    } catch (err) {
        console.log("Analytics Error: ", err);
    }
};

export default ClickTracking;