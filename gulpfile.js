const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less')
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//转移html文件
gulp.task('htmlmin', (done) => {
    gulp.src("./src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist"))
    done()
})

//监听任务
// gulp.task("watch", () => {
//         gulp.watch("./src/index.html,[html]");
//         gulp.watch(".src/css/index.css,[css]");
//     })
//开服务器
// gulp.task("server",function(){
//     connect.server({
//         port:8090,
//         livereload:true
//     });
// })

//转移less文件
// gulp.task("less", function() {
//     gulp.src("./src/css/*.less")
//         .pipe(less())
//         .pipe(connect.reload())
//         .pipe(gulp.dest("./dist/css"))
// })

//转移css文件
gulp.task("cssmin", (done) => {
        gulp.src(["./src/css/*.less", "./src/css/*.css"])
            .pipe(less())
            .pipe(csso())
            .pipe(gulp.dest("./dist/css"))
        done()
    })
    //转移JS文件
gulp.task('js', function(done) {
    gulp.src(["./src/js/*.js"])
        .pipe(gulp.dest("./dist/js"))
    done()
});
//js 转es5后 压缩
// gulp.task('jsmin', (done) => {
//     gulp.src('./src/js/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist/js'))
//     done()
// 



gulp.task('default', gulp.series('htmlmin', 'cssmin', 'js', () => {

}));



// gulp.task("default", ["htmlmin", "cssmin", "watch"]);