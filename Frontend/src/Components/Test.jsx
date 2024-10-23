import { useAclify } from "react-aclify";

const ProtectedComponent = () => {
  const { isAuthorized } = useAclify();

  if (!isAuthorized(["admin", "editor"], ["manage-posts"])) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <div class="state-container">
        <span class="state" id="state-initial">
          Initial Value
        </span>
        <span class="dropdown-icon">&#9660;</span>
        <ul class="dropdown-options" id="dropdown-options">
          <li>
            <a href="#" data-state="Option 1">
              Option 1
            </a>
          </li>
          <li>
            <a href="#" data-state="Option 2">
              Option 2
            </a>
          </li>
          <li>
            <a href="#" data-state="Option 3">
              Option 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
