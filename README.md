# 基于Angular框架及Gin技术实现在线考试系统的开发与应用

# 需求分析

针对很多的考试科目，目前的考试形式仍然是以纸质的考试形式为主。而且很多科目的考试题型非常类似，区别仅在于题目的内容。并且考试组织仍然采用印刷数量众多的纸质试卷来实现，学生在试卷上填写答案，教师批阅纸质试卷上的答案，最后手动录入并分析成绩。这种考试方式效率低下，无论是在前提组织考试、学生答卷、以及后期教师阅卷和处理考试数据的过程中。不仅浪费了资源，降低了学校工作的效率，而且这种低效的考试方式，无法适应目前推广的“互联网+教育”的趋势。

所以需要采取另外一种更加高效的方式，既能够达到考察学生学习效果的目的，又能够提高考试的效率，加快阅卷的速度，同时还能规避掉更多的不公平和舞弊情况的出现。最终实现无纸化办公，以及彻底的互联网化教育。

EasyExam 在线考试系统就是为了满足上面的需求而开发的。

# 国内外现状

很明显，数理化考试已经成为国内外教育领域的趋势，而且正在广泛普及。随着信息技术的发展，国外发达国家已经在多年前普及了数字化考试，而且应用在各个不同阶段的教育工作中。近几年国内的互联网技术发展迅速，一些发达地图的教育机构也已经开始采用数理化考试作为主要的考试形式。随着大数据思想的提出，在各行各业都提倡用数据驱动工作，同样也包括教育行业。

通过数字化在线考试形式的普及，教育机构可以全面快速的采集或生成完整、全面的教育数据，通过对这些具有针对性的大数据的分析和挖掘，能够清晰的展现学生的学习情况，由此给与学校的管理和教学更多的参考，来尝试更好的教学形式，提高教学质量。

# 主要技术选型

## 前端

前端以网站页面的形式作承载系统的界面，通过采用一款名为 Angular 的 Web 框架实现。Angular 已经出现有 10 年之久，是一款成熟的前端框架，它具有跨平台，运行快速，开发简便等优良特性。

Angular 最主要的优势在于，它能够将复杂结构的数据与网站页面进行绑定，让页面呈现出更加复杂，变化多样的数据。当数据改变时，页面也会随即改变，非常适合用于教育教学领域。

Angular 可以有效的减少 HTML、CSS 和 JavaScript 的编写，通过其内在的逻辑，自动生成相似的代码，由此提高了开发速度。

而且 Angular 时一款完整的前端开发框架，不同于现有的其他前端开发工具，比如 Vue 和 React。其中 Vue 和 React 仅仅是前端开发库，主要用来开发网站的 UI 界面。而 Angular 不仅仅原生的提供了对 UI 界面的控制，而且还提供了许多关于 HTTP 网络访问、Form 表单的控制、Route 路由规则的定义等多种功能。而以上这些核心的功能，多余 Vue 和 React 都需要第三方包的支持，但是 Angular 已经能够提供一站式的开发需求了。

## 后端

目前用于后端 Web Server 开发的语言及其框架有很多，主要有基于 Java 语言的 JSP，基于 PHP 语言的 Larval，基于 Python 语言的 Django等。

但是以上的技术多少都有一些不太适合作为本系统的后端框架。首先 JSP 采用的是 Java 语言，而 Java 程序的繁琐无法使得无法达到敏捷开发，JSP 架构的部署也比较麻烦，需要其他的服务器程序比如 Tomcat 的支持，很难在教育领域的各个科目中快速普及；虽然 PHP 语言在开发阶段更加快速，而且学习成本较低，但是 PHP 语言本身是一门弱类型语言，对于数据的处理不够严密，而且是解释运行，运行的效率差，运行速度慢，很难承载起在线考试时出现的大流量的情况；Python 语言虽然学习门槛低，开发迅速，但是仍然对数据类型的管理不够严密，而且 Django 框架的运行同样需要其他第三方的服务器以及插件的支持，部署和配置都比较繁琐复杂，而且运行速度慢。

所以根据以上的分析，本系统的后端开发技术选型采用 Go 语言作为服务器的开发语言。Go语言是一门强类型语言，而且是编译运行的。对数据的类型和结构有着严格的规定，而且运行效率可以达到与 C 语言接近的程度。另外 Go 语言原生支持多线程，这样可以更好更彻底的利用目前计算机中性能优良的硬件资源，比如多核CPU，大容量内存，来实现更加快速稳定的服务器程序。

## 数据库

本系统的所有数据都会保存在数据库中，而且本系统的所有数据具有清晰的数据结构，所以采用了一款市面上广泛使用的开源关系型数据库 MySQL。它能够明确的定义所有数据的结构以及数据类型，无论是在读取还是写入时，都会检测数据结构及数据类型的正确性，这样就保证了数据的完整性和可用性。

同时 MySQL 还可以提供多个数据结构的关联，这样就能够支撑更加复杂的数据检索和挖掘的需求。

# 系统分析

EasyExam 在线考试系统在设计之初，就考虑到了目前学校的计算机机房的普遍情况。为了提高系统的使用率，增强系统对大部分机房环境的兼容性，在技术选型、开发语言和工具的选择方面，都做了细致的考量。

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

作为连接前端和数据库的桥梁，后端服务器采用 Go 语言开发，并借助了一个名为 Gin 的框架，以此来提高开发的效率，提高服务器运行的稳定性。

## 数据库

本系统的数据库服务器采用了关系型数据库 MySQL 的 8.0.17 开源版本。这款数据库具有效率高，部署方便，开发便捷等诸多优点。而且在互联网行业有着非常高的使用率，很多大型互联网公司都在使用。

关系型数据库擅长储存和检索具有明确结构的数据，非常适合考试系统中涉及到的数据的结构。

数据库中储存的数据有：

* 学生和教师的登录信息
* 班级和课程信息
* 选择、填空、判断、简答等题目数据
* 试卷结构以及与之相关的分值分布、科目和考试班级信息
* 学生的答卷数据，包括随机抽取的题目以及获得的成绩

# 系统架构

EasyExam 在线考试系统是基于 B/S 架构设计的。前端客户端全部通过 Web 网站的形式，在前端浏览器上实现运转。前端运行的主体是每一位学生的学生电脑。后端运行一套 Web Server 程序，作为前端的服务器。服务器程序主要由两大功能，一个是接收前端浏览器对网站的访问，另一个功能是连接数据库服务器程序，对数据库进行访问，提供数据的读取和写入等操作。

为了适应学校机房的特殊环境，避免考试时骤增的网络流量，这套系统以每一个机房的局域网为一个网络单元，各个机房之间相互隔离。这样处理既避免了巨大的网络流量对系统造成的拥塞，也降低了系统部署的难度，而且也为学校降低了服务器的成本。

本系统以每一个机房内的教师电脑作为服务器，将系统所有的程序代码部署在教师机内，学生机仅需要与教师机连接在同一个局域网中即可。学生机不需要安装任何第三方软件，只需要由一个主流的浏览器软件即可开始使用。学生机通过在浏览器中访问教师机的 IP 地址即可开始使用该系统。

在系统使用的过程中，产生的所有数据都会保存在教师机内的数据库中，保证了数据的完整和安全。

以下是整个系统的简单架构图:

![系统架构图](/src/assets/images/LAN.jpg)

# 创新点

## 前端技术

为了提高前端的开发效率，增加前端网站的功能以及表现力，在采用 HTML5、CSS3、JavaScript 的基础上，引入了一款强大的前端开发框架 —— Angular。它支持灵活多变的 DOM 控制，可以根据 JavaScript 所控制的数据的变化而快速的改变页面的 HTML 布局。

另外，Angular 还支持 TypeScript，使得 JavaScirpt 更加具有面向对象的特性，使得前端的数据结构更加规范，操作数据更加便捷和严谨。

本系统将一些细致的，复杂的数据处理操作交由前端程序逻辑来实现，这样做的好处就是很好的降低了后台服务器的压力，更好的利用到了每一台客户端设备的运算能力。

## 后端技术

因为后端采用了基于 Go 语言的 Gin 框架实现，它能够支持一秒内上万次的网络请求。Go 语言有很多成熟稳定的数据库驱动包，可以支持对市面上众多主流数据库的操作。而且部署方便，不需要依赖任何第三方插件，具有操作和管理方便，学习曲线平缓的优势。

## 数据库技术

数据库采用 MySQL 的开源版本，在MySQL中对数据的操作采用的是 SQL 语句，它有着很好的可阅读性，而且编写方便。

本系统定义了很多数据结构，都可以在 MySQL 中通过数据表的形式来管理。而且这些数据表中还可以通过主键和外键的形式，将多个数据表连接起来，提供更加复杂的数据结构，满足了系统将来扩展的需要，而且这些扩展可以非常方便的实现。

MySQL 数据库占用系统内存小，可以提供对数万行级别的数据进行高效读写的特性，非常适合作为中小型系统的数据库平台。

另外 MySQL 是一款成熟的数据库系统，很多开发语言和框架都有相关的框架，能够很好的与 MySQL 数据库联合工作。

## 数据传输

本系统的前端和后端通过 RESTFul API 的风格进行数据的传递。RESTFul API 是一种基于 HTTP 协议的数据传输的规范，可以使用 JSON 格式定义数据结构。通过这种规范，后端向前端以 URL 接口的形式提供服务。前端程序只需要通过 HTTP 协议调用访问后端提供的 RESTFul API 规范的 URL 地址，并给与相应的参数，就可以驱动后端程序，得到需要的数据和资源。

RESTFul API 是基于 HTTP 协议的，所以有着开发简便，可阅读性强，平台兼容性好的众多特性，已经广泛应用于 Web 和移动应用开发。

## 框架与开发包

针对用户层面，为了提高可用性、提供更加美观简便的操作界面，针对开发层面，为了规范开发流程，广泛的引入了很多第三方开发包和框架。

以下是所有涉及到的第三方框架和包。

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

Angular、Gin已经在前文做过详细的阐述，这里不再冗述。

Bootstrap 可以通过众多的 UI 组件和界面逻辑，在不同尺寸、不同设备中展现美观大方的界面。而且会根据屏幕尺寸的不同，自动调整页面布局。

JSON 是一种数据结构呈现的方式，它可以非常清晰的描述复杂的数据结构。而且这些数据结构可以方便的转换为字符串数据类型，在网络中快速的传输。在前端和后端都可以轻松的对 JSON 结构的数据进行转换、检索。

# 预期成果

通过采用 EasyExam 在线考试系统，希望通过这种完全数字化的考试形式，提高学校的工作效率，降低不必要的成本，提高学校对学生学习成果的考察效果。

同时通过在线考试系统，采集到更多的教学及考试数据，为后期进行大数据分析打好数据基础。以此来提升学校的管理档次，实现用数据驱动学校管理和教学的目的。

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

# 主要算法实现

## 登录/注册算法实现

在前端页面的表单中，根据用户需要填写的内容，在JavaScript代码中定义若干个类，这里主要有两个，一个是教师类，一个是学生类。

```
teacherForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    department: ['电子信息学院', Validators.required],
  })
```

```
studentForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    class_id: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(this.mobilePhonePattern)]],
    gender: ['', Validators.required]
  })
```

通过将类的相关属性与页面中表单的对应输入框进行双向数据绑定，即可从用户在输入框中数据的内容中获取类中相关属性的值。

*教师注册表单*
```
<form [formGroup]="teacherForm" (ngSubmit)="onTeacherSubmit()" class="regist-form"
                    *ngIf="!isTeacherRegisted">
                    <div class="form-group">
                        <label>工号</label>
                        <input type="text" class="form-control" placeholder="Teacher ID" formControlName="id"
                            [ngClass]="{'input-error': teacherForm.controls['id'].invalid && (teacherForm.controls['id'].dirty || teacherForm.controls['id'].touched)}">
                        <small
                            *ngIf="teacherForm.controls['id'].invalid && (teacherForm.controls['id'].dirty || teacherForm.controls['id'].touched)"
                            class="form-text text-danger">必须全部是数字</small>
                    </div>

                    <div class="form-group">
                        <label>姓名</label>
                        <input type="text" class="form-control" placeholder="Teacher Username"
                            formControlName="username"
                            [ngClass]="{'input-error': teacherForm.controls['username'].invalid && (teacherForm.controls['username'].dirty || teacherForm.controls['username'].touched)}">
                    </div>

                    <div class="form-group">
                        <label>密码</label>
                        <input type="password" class="form-control" placeholder="Teacher Password"
                            formControlName="password"
                            [ngClass]="{'input-error': teacherForm.controls['password'].invalid && (teacherForm.controls['password'].dirty || teacherForm.controls['password'].touched)}">
                    </div>

                    <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" class="form-control" placeholder="Teacher Email" formControlName="email"
                            [ngClass]="{'input-error': teacherForm.controls['email'].invalid && (teacherForm.controls['email'].dirty || teacherForm.controls['email'].touched)}">
                        <small class="form-text text-danger"
                            *ngIf="teacherForm.controls['email'].invalid && (teacherForm.controls['email'].dirty || teacherForm.controls['email'].touched)">邮箱格式不正确</small>
                    </div>

                    <div class="form-group">
                        <label>学院/系部</label>
                        <input type="text" class="form-control" placeholder="Teacher ID" formControlName="department"
                            [ngClass]="{'input-error': teacherForm.controls['department'].invalid && (teacherForm.controls['department'].dirty || teacherForm.controls['department'].touched)}">
                    </div>

                    <div class="form-group mt-4">
                        <button type="submit" class="btn btn-primary"
                            [disabled]="!teacherForm.valid || isRunTeacherRegisting">
                            <i class="fas fa-check mr-2"></i>
                            注 册
                        </button>
                        <span *ngIf="isRunTeacherRegisting"><i class="fas fa-cog fa-lg fa-spin ml-4 mr-2"></i>正在处理中
                            ...</span>
                    </div>
                </form>
```

*学生注册表单*
```
<form [formGroup]="studentForm" (ngSubmit)="onStudentSubmit()" class="regist-form">
                    <div class="form-group">
                        <label>学号</label>
                        <input type="text" class="form-control" placeholder="Student ID" formControlName="id"
                            [ngClass]="{'input-error': studentForm.controls['id'].invalid && (studentForm.controls['id'].dirty || studentForm.controls['id'].touched)}">
                        <small
                            *ngIf="studentForm.controls['id'].invalid && (studentForm.controls['id'].dirty || studentForm.controls['id'].touched)"
                            class="form-text text-danger">必须全部是数字</small>
                    </div>
                    <div class="form-group">
                        <label>姓名</label>
                        <input type="text" class="form-control" placeholder="Teacher Username"
                            formControlName="username"
                            [ngClass]="{'input-error': studentForm.controls['username'].invalid && (studentForm.controls['username'].dirty || studentForm.controls['username'].touched)}">
                    </div>
                    <div class="form-group">
                        <label>班级</label>
                        <select name="stu-class" class="form-control" formControlName="class_id"
                            [ngClass]="{'input-error': studentForm.controls['class_id'].invalid && (studentForm.controls['class_id'].dirty || studentForm.controls['class_id'].touched)}">
                            <option [value]="item.id" *ngFor="let item of classes">
                                {{item.type}}{{item.major}}{{item.regist_year}} {{item.num}} 班</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>密码</label>
                        <input type="password" class="form-control" placeholder="Student Password"
                            formControlName="password"
                            [ngClass]="{'input-error': studentForm.controls['password'].invalid && (studentForm.controls['password'].dirty || studentForm.controls['password'].touched)}">
                    </div>
                    <div class="form-group lead my-4">
                        <span class="mr-5">
                            <input type="radio" name="gender" formControlName="gender" value="男"> 男
                        </span>
                        <span>
                            <input type="radio" name="gender" formControlName="gender" value="女"> 女
                        </span>
                    </div>
                    <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" class="form-control" placeholder="Student Email" formControlName="email"
                            [ngClass]="{'input-error': studentForm.controls['email'].invalid && (studentForm.controls['email'].dirty || studentForm.controls['email'].touched)}">
                    </div>
                    <div class="form-group">
                        <label>电话</label>
                        <input type="text" class="form-control" placeholder="Student Phone" formControlName="phone"
                            [ngClass]="{'input-error': studentForm.controls['phone'].invalid && (studentForm.controls['phone'].dirty || studentForm.controls['phone'].touched)}">
                        <small class="form-text text-danger"
                            *ngIf="studentForm.controls['phone'].invalid && (studentForm.controls['phone'].dirty || studentForm.controls['phone'].touched)">11
                            位手机号码</small>
                    </div>
                    <div class="form-group mt-4">
                        <button class="btn btn-success" [disabled]="!studentForm.valid || isRunStudentRegisting">
                            <i class="fas fa-check mr-2"></i>
                            注 册
                        </button>
                        <span *ngIf="isRunStudentRegisting"><i class="fas fa-cog fa-lg fa-spin ml-4 mr-2"></i>正在处理中
                            ...</span>
                    </div>
                </form>
```

![form](/src/assets/images/form.jpg)

当用户点击注册或者登录按钮后，前端程序响应用户的点击操作，执行函数onTeacherSubmit() 或 onStudentSubmit()

```
onTeacherSubmit(): void {
    let self = this
    this.isRunTeacherRegisting = true

    this.backendService.addNewByTableName('teachers', this.teacherForm.value).subscribe(data => {
      self.isRunTeacherRegisting = false
      if (data['effect_rows'] == 1) {
        alert('教师注册成功 ！')
        // 直接跳转到管理页面，注意值的传递
      } else {
        alert('注册失败，请重试')
      }
    })
  }
```

```
onStudentSubmit(): void {
    let self = this
    this.isRunStudentRegisting = true

    this.backendService.addNewByTableName('students', this.studentForm.value).subscribe(data => {
      self.isRunStudentRegisting = false
      if (data['effect_rows'] == 1) {
        alert('学生注册成功 ！')
        sessionStorage.setItem('student', JSON.stringify(self.studentForm.value))
        self.studentForm.reset()
        self.router.navigateByUrl('study-center/student-profile')
        // 直接跳转到学习页面或者考试页面，注意值的传递
      } else {
        alert('注册失败，请重试')
      }
    })
  }
```
在这些函数中，调用全局的网络访问服务 backendService 中的 addNewByTableName() 方法

```
addNewByTableName(tableName: string, jsonObj: any): Observable<any> {
    let params = new URLSearchParams()
    Object.keys(jsonObj).forEach(key => {
      params.append(key, jsonObj[key])
    });
    let body = params.toString()
    return this.httpClient.post<Teacher>('/new/' + tableName, body, httpOptions)
  }
```
这个方法会将用户填写的数据先转换为 JSON 格式的键值对，然后再转换为字符串，和网络请求一起传递到后端服务器。这个方法是以异步的形式运行的，当这个方法运行后，前端浏览器会启动一个新的进程，这个进程会在一定的时间内等待后端返回的数据。

后端服务器的路由规则会监听前端的网络请求 `/new/:obj`，然后调用运行对应的处理函数 `AddNewObject()`

```
func AddNewObject(c *gin.Context) {
	// 从URL里的path参数获得数据表的名称
	obj := c.Param("obj")
	c.Request.ParseForm()
	// 开始拼接一个INSERT的SQL语句
	sql := "INSERT INTO " + obj
	// 定义一个空的切片，用于后面的SQL拼接
	fields := []string{}
	// 定义一个空的接口数组，后面将POST里传递过来的值插入到这个切片里，最终由于 Exec 方法的动态参数
	values := []interface{}{}
	// 定义一个空数组，作为占位符，这个数组里的所有值都是问号，"?"
	placeholders := []string{}
	for a := 0; a < len(c.Request.PostForm); a++ {
		placeholders = append(placeholders, "?")
	}

	// 将post请求传递来的数据转换为map的数组，然后分别放入之前定义的数组中
	for key, value := range c.Request.PostForm {
		fields = append(fields, key)
		if key == "password" {
			// 如果是密码，则加密
			values = append(values, utility.MD5(value[0]))
		} else {
			// 否则就直接添加到values这个接口的数组里
			values = append(values, value[0])
		}
	}
	// 拼接一个带有问号占位符的SQL语句
	sql += " (" + utility.ConvertArrayToString(fields) + ") VALUES (" + utility.ConvertArrayToString(placeholders) + ")"

	conn := getDBConnection()
	defer conn.Close()

	stmt, _ := conn.Prepare(sql)
	// Exec方法支持传入一个可变参数，这个可变参数其实是一个数组，正好对应了刚才创建的values接口数组
	result, err := stmt.Exec(values...)

	effectRows, _ := result.RowsAffected()
	if err != nil {
		panic(err.Error())
		c.JSON(400, gin.H{
			"message":     err.Error(),
			"effect_rows": 0,
		})
	} else {
		c.JSON(200, gin.H{
			"message":     "complete",
			"effect_rows": effectRows,
		})
	}
}
```

后端处理函数会将前端传递过来的数据重新转换为 key-value 键值对，并拼接成为相应的 SQL 语句。最后连接数据库，并运行 SQL 语句，完成对数据库的操作。

如果操作成功，则构建一个状态值为 200 的 JSON 格式的数据，并返回给前端；如果操作失败，同样构建一个状态值为 400 的 JSON 格式的数据，返回给前端。

前端根据后端服务器返回的数据中的状态值以及相应的数据，对前端的页面进行相应的交互处理，给与用户提示。

以上就是一个完整的从前端到户端的数据请求和返回全过程的算法实现的简介。

## 随机抽题算法实现

当学生登录成功后，前端程序会缓存该学生的班级信息。当学生进入到自己的主页面后，如果教师发布了该班级的考试后，那么该学生就能够看到相应的考试信息，点击后即可开始抽题答卷。

![学生主页](/src/assets/images/stu_profile.jpg)

当学生点击【开始考试】按钮后，系统会将该学生的班级和考试这两个数据以 `sessionStorage` 的方式保存在浏览器。

![学生主页](/src/assets/images/sessionStorage.jpg)


在考试抽题页面，前端会从浏览器的 `sessionStorage` 中获取到班级和考试的数据，调用 `setupMyexam()` 方法，随即开始随机抽题，组成试卷。

```
// 组织试卷结构，生成试卷的实际内容
  setupMyexam() {
    let self = this
    this.isFetchingAllQuestions = true
    this.myexam['questions'] = JSON.parse(this.myexam['questions'])

    let body = {
      course_id: this.myexam['course_id']
    }

    // 为了将所有的题型都抽到，这里定义了一个请求题型的数组
    let arr = []
    let questionLength = this.myexam['questions'].length
    for (let i = 0; i < questionLength; i++) {
      let questionObj = this.myexam['questions'][i]
      arr.push({
        tableName: questionObj['question'],
        limit: questionObj['count'],
        obj: body
      })
    }
    this.backendService.queryQuestionsRandom(arr).subscribe(result => {
      this.isFetchingAllQuestions = false
      for (let i = 0; i < questionLength; i++) {
        self.myexam['questions'][i]['contents'] = result[i]['response']
        let questionObj = self.myexam['questions'][i]
        for (let j = 0; j < questionObj['contents'].length; j++) {
          /**
           * Reformat content json data struct
           */
          let tempJson = JSON.parse(questionObj['contents'][j]['content']
          )
          Object.keys(tempJson).forEach(key => {
            questionObj['contents'][j][key] = tempJson[key]
          });
          /**
           * 给每一道题预设一个得分。默认为 -1 分，表示还没有判分。
           * 有些题型，比如单选、判断、填空，可以由程序自动判分，在方法 onChoicesGetAnswer, onFillsGetAnswer, onJudgesGetAnswer 里就可以完成判分。有些题型，比如 short_answer 和 codings，后期由可能需要借助 AI来完成，或者通过教师人工判分。
           */
          questionObj['contents'][j]['score'] = -1
          delete questionObj['contents'][j]['content']
          // Add a feature "stu_answer" to every content object
          switch (questionObj['question']) {
            case 'choices':
              questionObj['contents'][j]['stu_answer'] = null
              break
            case 'fills':
              const len = questionObj['contents'][j]['standard_answer'].length
              let arr = []
              for (let i = 0; i < len; i++) {
                arr.push('')
              }
              questionObj['contents'][j]['stu_answer'] = arr
              questionObj['contents'][j]['is_full'] = false
              break
            case 'judges':
              questionObj['contents'][j]['stu_answer'] = null
              break
            case 'short_answers':
              questionObj['contents'][j]['stu_answer'] = null
              break
          }
        }
      }
    })

    this.myexam['total_score'] = 0
    this.setupTime()
  }
```

在 `setupMyexam()` 方法中，会调用全局的网络访问服务 backendService 中的 `queryQuestionsRandom()` 方法。

```
queryQuestionsRandom(tableNames: any[]) {
    let requestArray = []
    tableNames.forEach(element => {
      requestArray.push(this.queryQuestionsByTableNameAndLimit(element['tableName'], element['limit'], element['obj']))
    });
    // 当上面所有的请求都完成后，再返回给函数调用者
    return forkJoin(requestArray)
  }
```

该方法会将学生班级信息以及对应的考试试卷设定信息传递到后端服务器，服务器中的处理函数 `QueryObjectsRandom()` 根据这些数据拼接成一个 SQL 语句，这个 SQL 语句会在对应的题库数据表中随机检索题目数据。然后将随机检索到的题目根据题型重新组合成 JSON 格式的字符串返回给前端。

```
func QueryObjectsRandom(c *gin.Context) {
	obj := c.Param("obj")
	limit := c.Param("limit")
	c.Request.ParseForm()

	sql := "SELECT * FROM " + obj + " WHERE "
	conditions := []string{}

	for key, value := range c.Request.PostForm {
		conditions = append(conditions, key+"="+value[0])
	}
	whereCondition := utility.MakeQueryConditionFromArray(conditions)
	sql += whereCondition + " ORDER BY rand() LIMIT " + limit

	conn := getDBConnection()
	defer conn.Close()

	// 在数据库里执行这个拼接好的SQL语句
	rows, err := conn.Query(sql)
	if err != nil {
		panic(err.Error())
		return
	}

	// 得到所有属性名称组成的数组 columns
	columns, _ := rows.Columns()
	// 计算属性的个数
	count := len(columns)

	tableData := make([]map[string]interface{}, 0)
	values := make([]interface{}, count)
	valuePtrs := make([]interface{}, count)

	for rows.Next() {
		for i := range columns {
			// valuePtrs 和 values 大小一致，类型一致，这里将values的指针传递给valuePtrs
			valuePtrs[i] = &values[i]
		}
		// 因为Scan方法将一行记录扫描后，返回的是每一个字段的数据的指针。这个方法的参数就是用来接收这些指针的。正好
		rows.Scan(valuePtrs...)

		// 保存一行记录中的一对 key-value pair
		entry := make(map[string]interface{})

		// 将每一个key-value 都写入到 entry中
		for i, col := range columns {
			var v interface{}
			val := values[i]

			// 判断 val 的类型是不是 byte 字节类型
			b, ok := val.([]byte)
			if ok {
				v = string(b)
			} else {
				v = val
			}
			entry[col] = v
		}
		// 最终将代表一行记录的entry保存进tableData。 tableData 就表示从这张表里查询出来的所有记录。
		tableData = append(tableData, entry)
	}

	h := gin.H{}
	h["response"] = tableData
	c.JSON(200, h)

}
```

前端的 `setupMyexam()` 方法仍然是一个异步函数，会等待后端传来的数据。当得到服务器传递回来的题目数据后，再重新按照题型的分布，重新组合成 JSON 格式的数据，最终将这些数据绑定到页面上对应的 HTML 视图中，学生点击相应的链接，即可看到题目，开始答题。

![stu_exam](/src/assets/images/feature-7.jpg)

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

编译完成后，会在前端项目的根目录下得到一个文件夹

```
|-- dist
    |-- EasyExamClient
```
将文件夹 `EasyExamClient` 复制到最终的程序目录 `EasyExam` 下。

## 后端

```
go build
```

编译完成后，会在后端项目的根目录下得到一个 `EasyExamServer.exe` 可执行文件。将这个文件复制到最终的程序目录 `EasyExam` 下。

# 部署 & 运行

## 部署

将最终的程序文件夹 `EasyExam` 复制到 Windows 系统的 C: 盘 根目录下。

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

![easyexam_homepage](/src/assets/images/homepage.jpg)

### 结束

* 1、关闭浏览器
* 2、关闭 `EasyExamServer.exe` 弹出的命令行窗口
* 3、双击 `Run mysql server.bat` 弹出的命令行窗口
