# EasyExamClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Building Product


Building the dist folder
```
$ ng build --prod --base-href=/ee/
```

At the browser, run command as below
```
http://SERVER_IP_ADDRESS:8000/ee
```

# 《开发文档》

```
开发文档包括：《功能要求》、《需求分析》、《技术分析》、《系统分析》、《数据库文档》、《功能函数文档》、《界面文档》、《编译手册》、《QA文档》、《项目总结》等。此次我编写的是软件开发文档。

产品文档包括：《产品简介》、《产品技术白皮书》、《评测报告》、《安装手册》、《使用手册》、《维护手册》、 《用户报告》、《销售培训》等。

《功能函数文档》——包括变量名、变量初值、功能、函数名、参数、如何调用、备注、注意事项等。以《系统分析》为基础，进行详细的说明，列出哪个功能涉及多少个函数，以便以后程序员修改、接手和扩展。
```

# 需求分析

针对很多的考试科目，目前的考试形式仍然是以纸质的考试形式为主。学生在试卷上填写答案，教师修改纸质试卷上的答案。这种方式的效率低下，无论是在组织和准备考试的过程中，还是在学生答卷以及教师阅卷的时候。不仅浪费了资源，而且降低了学校工作的效率。

所以需要采取另外一种更加高效的方式，既能够达到考察学生学习效果的目的，又能够提高考试的效率，加快阅卷的速度，同时还能规避掉更多的不公平和舞弊情况的出现。

EasyExam 在线考试系统就是为了满足上面的需求而开发的。

# 系统分析

EasyExam系统采用了前后端分离的架构。该系统在设计之初，就考虑到了目前学校的计算机机房的普遍情况。为了提高系统的使用率，增强系统对大部分机房环境的兼容性，在技术选型、开发语言和工具的选择方面，都做了细致的考量。

## 前端

前端通过 Angular 这个 Web 框架自成体系，本质上是一个中型的网站，含有众多的子页面以及功能模块。

前端的主要负责如下的工作：

* 界面的布局
* 信息的展示
* 用户交互
* 相关信息的提示和链接导航
* 承担更加精细化的数字计算

## 后端

后端以一个 Web Server 的形式呈现，承担前端的网络请求，根据请求的参数不同，从数据库检索数据，并返回给前端。

同时接收从浏览器传递来的访问网站的请求。

后端作为连接前端和数据库的桥梁，为了简化开发的难度，提高运行的效率，后端服务器采用 Go 语言开发，并借助了一个Go Web Server 框架 Gin，以此来提高开发的效率，提高服务器运行的稳定性。

## 数据库

本系统的数据库服务器采用了关系型数据库 MySQL 的 8.0.17 开源版本。这款数据库具有效率高，部署方便，开发便捷等诸多优点。而且在互联网行业有着非常高的使用率，很多大型互联网公司都在使用。

关系型数据库擅长储存和检索具有明确结构的数据，非常适合考试系统中涉及到的数据的结构。

数据库中储存的数据有：

* 学生和教师的登录信息
* 班级和课程信息
* 选择、填空、判断、简答等题目数据
* 试卷结构以及与之相关的分值分布、科目和考试班级信息
* 学生的答卷数据，包括随机抽取的题目以及获得的成绩

# 技术分析

## 前端技术

为了提高前端的开发效率，增加前端网站的功能以及表现力，在采用 HTML5、CSS3、JavaScript 的基础上，引入了一款强大的前端开发框架 —— Angular。

它支持灵活多变的 DOM 控制，可以根据 JavaScript 所控制的数据的变化而快速的改变页面的 HTML 布局。

另外，Angular 还支持 TypeScript，使得 JavaScirpt 更加具有面向对象的特性，使得前端的数据结构更加规范，操作数据更加便捷和严谨。

## 后端技术

Go 语言拥有十多年的历史，在云计算等领域有着广泛的应用。而且 Go 语言避免了类似 Java 里的很多用处不大的功能，而是用更少的代码完成更多的工作。

Go 语言是一款强类型语言，可以非常方便的规范数据的结构，很适合在线考试中对数据的要求。

## 数据库技术

数据库采用 MySQL 的开源版本，在MySQL中对数据的操作采用的是 SQL 语句，它有着很好的可阅读性，而且编写方便。

另外 MySQL 是一款成熟的数据库系统，很多开发语言和框架都有相关的框架，能够很好的与 MySQL 数据库联合工作。

## 框架与开发包

另外，为了提高系统的可用性，还采用了其他第三方包或者框架，以下以表格的方式将所有涉及到的框架和包罗列出来。

|序号|名称|版本|简介|备注|
|--|--|--|--|--|
|1|Angular|8.0.1|Web 框架|前端|
|2|Bootstrap|4.0|页面布局、交互|前端|
|3|Font Awesome|5.0|图标|前端|
|4|jQuery|3.6.4|JavaScript 库 |前端|
|5|NodeJS|5.2.1|支撑Angular开发的前端平台|前端|
|6|moment.js|2.10.6|JavaScript 日期处理类库|前端|
|6|angular-highcharts|8.0.3|基于Angular的统计图表库|前端|
|7|Go|1.13.1|Web Server 开发语言|后端|
|8|Gin|1.13.1|HTTP Web 框架|后端|
|9|JSON|--|前后端传递数据的结构|后端|
|10|md5|--|MD5加密|后端|
|11|database/sql|1.0|Go语言连接MySQL的中间件|后端|


# 功能模块

## 所有用户

### 注册/登录

支持教师和学生的注册和登录功能，填写个人的基本信息。这些信息将会作为后期的数据管理的依据。因为教师的工号和学生的学号已经在学校系统中定义好，所以在系统中分别以 Teacher_ID 和 Student_ID 的形式存在，而且具有唯一性，不允许任意修改。这些 ID 信息将会匹配到班级信息、课程信息以及试卷信息等。

## 教师

### 基础数据

教师可以在系统中编辑基础数据，包括所管辖的班级信息以及所教授的课程信息。

班级信息和课程信息支持添加和删除功能。

### 题库资源

题库是考试的根本，题目的拟定也应该由教师来完成。

本系统目前支持的题型有选择题（单选）、判断题、填空题（单个或多个空）、简答题。其中简答题的题型比较宽泛，所以也可以用作编程题的题型来看待。

教师可以在相关的编辑区域编写题目的详细内容，并且选择此题对应的考试科目。在对应的位置系统也会根据考试科目自动统计不同题型的数量，并支持查看题目详细内容的功能。

### 考试设计

教师可以设计多个考试的模板，定义题型的分布以及对应的分值。在某个考试模板下面还可以添加需要参加这项考试的班级。

### 考试阅卷

在学生完成考试答题后，教师可以在系统的后台看到每一个参加考试学生的试卷信息，包括原题、参考答案和学生的答案。

教师根据学生的答卷情况，参考某一道题的分值给与相应的分数。

由于选择题、判断题、填空题的答案属于标准答案，所以系统会根据学生答案和标准答案自动赋上分值。至于简答题，因为答案比较灵活，所以还需要教师人工阅读试卷，手动地给予分值。

当教师完成阅卷后，分值就会保存在数据库中对应学生的记录中。

### 统计信息

统计信息模块，作为本系统的数据中心，支持对系统中所有数据的查看、统计和可视化展示。在该模块中，可以对班级、课程、已注册的学生、考试信息等方面进行统计和可视化展示。

该模块还支持成绩分析的功能。因为在完成考试后，还需要为每一名学生给予平时分，根据平时分和考试分的占比，系统会自动计算出综合评定成绩。

同时，系统支持根据考试分或者综合评定，计算出某一个班级的最高分、最低分、及格率，以及分值分布等统计数据。

## 学生

学生的权限在本系统中比较简单，主要以考试为主。

### 参加考试

当学生登录到系统后，就会看到教师先前发布的考试信息。点击相应的按钮即可进入考试。

进入考试后，系统会根据考试模板，在题库中随机抽题，所以每一名学生在同一门考试中的试卷都不会完全相同，降低了作弊的可能性。

一旦学生完成答卷，提交试卷后，系统将关闭该生重复考试的渠道。


# 数据库设计

## 数据库基本信息

|Key|Value|
|-|-|
|Name|**easyexam**|
|Engine|innDB|
|charset|utf-8|

## 数据库实例连接

|Key|Value|
|-|-|
|Engine|MySQL|
|Version|5.7+|
|account|root|
|password|null|
|Operating System|Windows 7+|
|url|localhost 或者 127.0.0.1|
|default schema|**easyexam**|

## 数据表关系图

![EasyExam Diagram](/src/assets/images/easyexam-diagram.png)

# 前端 API

> 包名：Utility

|序号|函数名|参数列表|返回值(数据类型))|功能描述|
|--|--|--|--|--|
|1|getIdByTimestamp|无|唯一的ID (整型)|根据当前的日期时间返回一个11位以内的整数时间戳作为ID|
|2|getDatetime|无|格式化的日期时间 (字符串)|返回格式化后的日期时间字符串，格式为 `年-月-日 小时:分钟:秒`|
|3|checkTeacherLogin|无|无|检查浏览器中`sessionStorage`中`teacher`项，如果没有此项，则页面自动跳转到首页|
|4|checkStudentLogin|无|无|检查浏览器中`sessionStorage`中`student`项，如果没有此项，则页面自动跳转到首页|
|5|goToTop|无|无|工具函数，控制页面滚动到顶部|
|6|replaceAll|str: string, searchStr: string, replaceStr: string|返回替换过后的新字符串|从一个长字符串`str`中搜索某个字符串`searchStr`，如果匹配到，则替换为新的字符串`replaceStr`|
|7|groupData|originalData: any[], tag_id: string, tag_name: string, arr_name: string|返回分组完成后的新字符串|从原始的数组中originalData，根据相同的tag_id和tag_name，将原始字符串数组分组后，依照arr_name重新组合成为一个新的二维数组|
|8|removeDuplicateObjects|array: any[]|返回去重后的新数组|从原始数组中去掉重复的元素|

> 包名：Backend

|序号|函数名|参数列表|返回值(数据类型))|请求类型|功能描述|
|--|--|--|--|--|--|
|1|getContacts|无|JSON|GET|得到作者的信息|
|2|fetchMultipleTables|tableNameArr: string[], body?: any|JSON|POST|作为其他函数的容器函数，只有其内部的所有函数都完成后，此函数才会最终完成|
|2|fetchAllByTableName|tableName: string, body?: any|JSON|POST|根据给出的表的名称，得到对应数据表中的所有记录|
|3|addNewByTableName|tableName: string, jsonObj: any|Observable|POST|向给定的数据表中添加一行记录|
|4|removeByTableName|tableName: string, jsonObj: any|Observable|POST|删除给定的数据表中指定的一行记录|
|5|updateByTableName|tableName: string, jsonObj: any|Observable|POST|更新给定的数据表中指定的行的某个属性|
|6|modifyRowsByTableName|tableName: string, jsonObj: any|Observable|POST|更新给定的数据表中指定的一行记录|
|7|queryQuestionsByTableNameAndLimit|tableName: string, limit: number, jsonObj: any|Observable|POST|依照`limit`和`jsonObj`在指定的题库表中抽取全部题目|
|8|queryQuestionsRandom|tableNames: any[]|JSON|POST|从指定的数据表中随机抽取题目，组成json数据后返回|


# URL 列表

|序号|URL|参数说明|作用|
|--|--|--|--|
|1|http://SERVER_ID_ADDRESS:8000/`ee`|无参数|访问前端网站|
|2|http://SERVER_ID_ADDRESS:8000/ee/`ping`|无参数|测试服务器的可访问性|
|3|http://SERVER_ID_ADDRESS:8000/ee/`fetch/:obj`|表名称|根据表名称检索表中的所有记录|
|4|http://SERVER_ID_ADDRESS:8000/ee/`query/:obj/:limit`|表名称，限制行数|根据表名和限制的行数，检索表中的记录|
|5|http://SERVER_ID_ADDRESS:8000/ee/`new/:obj`|表名称|根据表名，向其中添加新的记录|
|6|http://SERVER_ID_ADDRESS:8000/ee/`update/:obj`|表名称|根据表名，更新其中记录中的某个属性|
|7|http://SERVER_ID_ADDRESS:8000/ee/`remove/:obj`|表名称|根据表名，删除数据表中的某一行记录|
|8|http://SERVER_ID_ADDRESS:8000/ee/`modify-rows/:obj`|表名称|根据表名，修改数据表中的某一行记录|




# 界面设计

![UI Design](/src/assets/images/UI-design.jpg)

# 编译命令

当系统处于开发阶段时，可以参考以下的前端和后端的编译命令，分别对系统的前端和后端进行编译，得到压缩后的文件或文件夹。

## 前端

```
ng build --prod --base-href=/ee/
```

## 后端

```
go build
```

# 部署 & 运行

## 部署

将文件夹 EasyExam 复制到 Windows 系统的 C: 盘 根目录下。

## 运行

部署完成后，文件目录如下所示：

```
|-- C:
    |-- EasyExam
        |-- EasyExamClient
        |-- mysql
        |-- EasyExamServer.exe
        |-- Run mysql server.bat
        |-- Stop mysql server.bat
```

### 开始

* 1、双击 `Run mysql server.bat` 启动数据库服务器
* 2、双击 `EasyExamServer.exe` 启动 Web Server 服务器
* 3、在浏览器地址栏中输入 `http://服务器IP地址:8000/ee`

### 结束

* 1、关闭浏览器
* 2、关闭 `EasyExamServer.exe` 弹出的命令行窗口
* 3、双击 `Run mysql server.bat` 弹出的命令行窗口
