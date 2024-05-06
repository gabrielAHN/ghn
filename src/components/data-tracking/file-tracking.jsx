import posthog from 'posthog-js';

const FileTracking = ({status, file_name, file_type}) => {
    try {
        posthog.capture(
            'fileUpload', {
            status: status,
            file_name: file_name,
            file_type: file_type
        }
        );
    } catch (err) {
        console.log("Analytics Error: ", err);
    }
};

export default FileTracking;