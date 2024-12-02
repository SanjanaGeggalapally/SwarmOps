def node_prcs(node):
    res = {}

    # ID
    res['id'] = node.get("ID")

    # Version
    res['version'] = node.get("Version").get("Index")

    # Created At
    res['created_at'] = node.get("CreatedAt")

    # Updated At
    res['updated_at'] = node.get("UpdatedAt")

    # Labels
    res['labels'] = node.get("Spec").get("Labels")

    # Role
    res['role'] = node.get("Spec").get("Role")
    
    # Hostname
    res['hostname'] = node.get("Description").get("Hostname")

    # Platform - Architecture
    res['arch'] = node.get("Description").get("Platform").get("Architecture")
    
    # Platform - OS
    res['os'] = node.get("Description").get("Platform").get("OS")

    # Status - state
    res['state'] = node.get("Status").get("State")

    # Status - IP Addr
    res['ip_addr'] = node.get("Status").get("Addr")

    # Manager Status - Leader
    res['leader'] = node.get("ManagerStatus").get("Leader")
    
    return res 