def task_prcs(task):

    res = {}

    res['id'] = task.get('ID') 
    res['version'] = task.get('Version').get('Index')
    createdAt = task.get("CreatedAt")
    ca_time = createdAt.split('T')[0]
    res['created_at'] = ca_time
    res['updated_at'] = task.get('UpdatedAt') 
    # res['labels'] = task.get('Labels')
    img = task.get('Spec').get('ContainerSpec').get('Image') 
    res['image'] = img.split('@')[0]
    res['node_id'] = task.get('NodeID')
    res['desired_state'] = task.get('DesiredState')

    return res