##小型单页面问卷网站

js: react + react-router + es6

css: css-modules + less

构建工具： webpack + babel

图表： echarts


##问卷管理列表

有一个头部可以显示logo，不需要实现登录等操作
问卷管理列表页面默认为首页
有一个表格用于展示所有已创建的问卷
列表中包括列有：问卷名称，问卷状态（未发布，发布中，已结束），和操作区域（编辑、删除、查看数据）
问卷状态为未发布时，可以做的操作为编辑、删除、查看问卷
问卷状态为发布中和已结束时，可以做的操作为查看数据、查看问卷
表格最左侧有批量选择（多选）的checkbox，多选后，可以进行批量删除功能，checkbox样式用默认即可，不需要按照设计图的样式
当一个问卷都没有的时候，表格不展现，页面显示大大的新建问卷按钮
##问卷新建及编辑

点击问卷管理列表中的新建按钮后，进入到问卷新建页面
点击问卷列表中某个问卷行的编辑按钮后，进入到问卷的编辑页面
新建页面和编辑页面基本相同
问卷有一个标题字段，点击后可以进入编辑状态
可以针对问卷中的问题进行增删改操作，每个问卷最少一个问题，最多十个问题
问题类型包括：单选题、多选题、单行文本题
可以对所有问题进行位置改变（上移、下移），复用，删除的操作
最上面的问题没有上移操作，最下面的问题没有下移操作
点击复用时，在被复用的问题紧接着的下方新增一个和被复用完全一样的问题（包括选项）
对于单选题和多选题，可以对问题的选项进行增、删、改、排序操作
文本题可以设定是必填还是非必填的问题
有一个问卷调查填写截止时间，使用一个日历组件来进行时间的选择，日期选择不能早于当前日期
保存问卷可以进行问卷的保存
发布问卷可以使得问卷状态变为发布中的状态
当点击发布时，如果截止日期早于当前日期，则需要提示修改截止日期
##删除问卷

在问卷管理列表中点击某个问卷的删除按钮后，弹出一个浮出层，让用户二次确认是否删除该问卷，如果用户点击是，则删除掉该问卷
##查看问卷

在问卷管理列表中点击查看问卷的按钮后，在新窗口中打开该问卷的页面，该页面是可供用户进行问卷填写的页面，在问卷未发布状态和已结束状态时，问卷提交是无效的。
该页面在移动端需要进行良好的兼容支持
##查看数据

在问卷管理列表中点击查看数据按钮后，进入到一个数据报告页面，用图表形式呈现各个单选题和多选题的选择情况
如设计稿中呈现，每一个问题在右侧用某种图表来呈现答题情况，自行选择合适的图表，设计稿中仅为示意，图表样式不需要和设计稿一致。推荐单选题使用饼状图，多选题使用条形图
文本题用一个百分比图展现有效回答占比即可
返回按钮点击后返回列表页面
在项目中尝试模块化的方法及工具
在项目中尝试CSS预处理工具
在项目中尝试项目构建、打包工具
