const gulp = require("gulp");
const gulpif = require("gulp-if");
const nunjucksRender = require("gulp-nunjucks-render");
const projectPath = require("../lib/projectPath");
const data = require("gulp-data");
const path = require("path");
const fs = require("fs");

gulp.task("html", function() {
  paths = {
    src: [
      `./node_modules/giza-framework/html/{components,content,modules}/**/*.html`,
      `./node_modules/jaywing-frontend-component-library/html/{components,content,modules}/**/*.html`,
      projectPath(
        PATH_CONFIG.BASE,
        PATH_CONFIG.html.src,
        "templates/**/*.html"
      ),
      projectPath(
        PATH_CONFIG.BASE,
        PATH_CONFIG.html.src,
        "{components,content,modules,lab}/**/*.html"
      )
    ],
    src_render: [
      projectPath(PATH_CONFIG.lab),
      `./node_modules/jaywing-frontend-component-library/html/layouts`,
      `./node_modules/jaywing-frontend-component-libraryk/html/macros`,
      `./node_modules/jaywing-frontend-component-library/html/content`,
      `./node_modules/jaywing-frontend-component-library/html/components`,
      `./node_modules/jaywing-frontend-component-library/html/modules`,
      `./node_modules/giza-framework/html/layouts`,
      `./node_modules/giza-framework/html/macros`,
      `./node_modules/giza-framework/html/content`,
      `./node_modules/giza-framework/html/components`,
      `./node_modules/giza-framework/html/modules`,
      projectPath(PATH_CONFIG.BASE, PATH_CONFIG.html.src)
    ],
    dest: projectPath(PATH_CONFIG.buildDest, PATH_CONFIG.buildSite)
  };

  const dataFunction = function() {
    var dataPath = path.resolve(
      `${PATH_CONFIG.BASE}/${PATH_CONFIG.html.src}/lab/_data.json`
    );
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  };

  return gulp
    .src(paths.src)
    .pipe(data(dataFunction))
    .pipe(
      nunjucksRender({
        path: paths.src_render
      })
    )
    .pipe(gulp.dest(paths.dest));
});
