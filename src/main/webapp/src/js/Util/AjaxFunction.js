export const DepartmentCount = '/department/count';          // 数据总数     --参数：无
export const DepartmentQuery = '/department/query';          // 数据查询     --参数：queryName
export const DepartmentAdd = '/department/add';              // 添加部门     --参数：name,address,phone,other,active
export const DepartmentEdit = '/department/edit';            // 修改部门     --参数：id,name,address,phone,other,active
export const DepartmentDelete = '/department/delete';        // 删除部门     --参数：id
export const DepartmentActive = '/department/active';        // 激活部门     --参数：id
export const DepartmentAbandon = '/department/abandon';      // 注销部门     --参数：id
export const DepartmentName = '/department/name';            // 检测名称     --参数：name
export const DepartmentNames = '/department/names';          // 检测名称     --参数：name
export const DepartmentAddress = '/department/address';      // 检测地址     --参数：address
export const DepartmentPhone = '/department/phone';          // 检测电话     --参数：phone
export const DepartmentCascade = '/department/cascade';      // 获取级联     --参数：无
export const DepartmentFather = '/department/father';        // 检测父级     --参数：father
export const DepartmentFatherGet = '/department/fatherGet';  // 获取父级     --参数：father

export const RoleCount = '/role/count';                      // 数据总数     --参数：无
export const RoleQuery = '/role/query';                      // 数据查询     --参数：queryName
export const RoleName = '/role/name';                        // 检测名称     --参数：name
export const RoleNames = '/role/names';                      // 检测名称     --参数：name
export const RoleAdd = '/role/add';                          // 添加角色     --参数：name,other
export const RoleSet = '/role/set';                          // 修改权限     --参数：id
export const RoleDelete = '/role/delete';                    // 删除角色     --参数：id
export const RoleEdit = '/role/edit';                        // 修改角色     --参数：id,name,other
export const PowerTree = '/role/power';                      // 获取权限     --参数：无
export const DeptTree = '/role/dept';                        // 获取部门     --参数：无
export const PowerNow = '/role/powers';                      // 当前权限     --参数：id
export const DeptNow = '/role/depts';                        // 当前部门     --参数：id
