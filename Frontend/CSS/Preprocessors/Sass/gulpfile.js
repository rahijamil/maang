const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Compile Sass to CSS
gulp.task("sass", function () {
  return gulp
    .src("src/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"));
});

// Watch for changes in Sass files and run the Sass task
gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.scss", gulp.series("sass"));
});

// Default task - run both Sass and watch tasks
gulp.task("default", gulp.series("sass", "watch"));
