def task_prcs(task):

    res = {}

    res['id'] = task.get('ID') 
    res['version'] = task.get('Version').get('Index')
    res['created_at'] = task.get('CreatedAt') 
    res['updated_at'] = task.get('UpdatedAt') 
    res['labels'] = task.get('Labels')
    res['image'] = task.get('Spec').get('ContainerSpec').get('Image') 
    res['node_id'] = task.get('NodeID')
    res['desired_state'] = task.get('DesiredState')

    return res