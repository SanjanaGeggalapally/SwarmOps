import { useAclify } from 'react-aclify';

const ProtectedComponent = () => {
  const { isAuthorized } = useAclify();

  if (!isAuthorized(['admin', 'editor'], ['manage-posts'])) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      {/* Content that requires 'admin' or 'editor' role and 'manage-posts' permission */}
    </div>
  );
};