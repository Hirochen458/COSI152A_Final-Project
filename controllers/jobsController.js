const Job = require("../models/job");

const getJobParams = (body) => {
  return {
    title: body.title,
    company: body.company,
    location: body.location,
    description: body.description,
    requirements: body.requirements,
    salary: body.salary,
    contactEmail: body.contactEmail,
    contactPhone: body.contactPhone,
    postDate: body.postDate,
    deadlineDate:body.deadlineDate,
    isActive: body.isActive,
  };
};
module.exports = {
  validate: (req, res, next) => {
    req.check("title", "title cannot be empty").notEmpty();
    req.check("company", "company cannot be empty").notEmpty();
    req.check("location", "location can not be empty").notEmpty();
    req.check("description", "description can not be empty").notEmpty();
    req.check("requirements", "requirements cannot be empty").notEmpty();
    req.check("salary", "salary cannot be empty").notEmpty();
    req.check("salary", "salary code should be numbers").isInt();
    req.check("contactEmail", "contactEmail can not be empty").notEmpty();
    req.check("contactEmail", "contactEmail is invalid").isEmail();
    req.check("contactPhone", "contactPhone can not be empty").notEmpty();
    req.check("postDate", "postDate can not be empty").notEmpty();
    req.check("deadlineDate", "deadlineDate can not be empty").notEmpty();

    req.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/jobs/new";
        next();
      } else {
        next();
      }
    });
  },
  
  index: (req, res, next) => {
    Job.find({})
      .then((jobs) => {
        res.locals.jobs = jobs;
        console.log(jobs)
        next();
      })
      .catch((error) => {
        console.log(`Error fetching jobs: ${error.message}`);
        next(error);
      });
  },

  indexView: (req, res) => {
    res.render("jobs/index");
  },

  new: (req, res) => {
    res.render("jobs/new");
  },

  create: (req, res, next) => {
    let jobParams = getJobParams(req.body);
    Job.create(jobParams)
      .then((job) => {
        req.flash(
          "success",
          `${job.title} created successfully!`
        );
        res.locals.redirect = "/jobs";
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error saving job: ${error.message}`);
        res.locals.redirect = "/jobs";
        req.flash(
          "error",
          `Failed to create job because: ${error.message}`
        );
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  show: (req, res, next) => {
    let jobId = req.params.id;
    Job.findById(jobId)
      .then((job) => {
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching job by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("jobs/show");
  },

  edit: (req, res, next) => {
    let jobId = req.params.id;
    Job.findById(jobId)
      .then((job) => {
        res.render("jobs/edit", {
          job: job,
        });
      })
      .catch((error) => {
        console.log(`Error fetching job by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let jobId = req.params.id,
    jobParams = getJobParams(req.body);
    Job.findByIdAndUpdate(jobId, {
      $set: jobParams,
    })
      .then((job) => {
        req.flash(
          "success",
          `${job.title}'s information updated successfully!`
        );
        res.locals.redirect = `/jobs/${jobId}`;
        res.locals.job = job;
        next();
      })
      .catch((error) => {
        console.log(`Error updating job by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    
    let jobId = req.params.id;
    Job.findByIdAndRemove(jobId)
      .then((job) => {
        req.flash(
          "success",
          `${job.title} deleted successfully!`
        );
        res.locals.redirect = "/jobs";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting job by ID: ${error.message}`);
        next();
      });
  },
};