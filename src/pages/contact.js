import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo"
import Layout from "../components/layout";
import bgImage from '../images/contact_bg.jpg'
import { PortableText } from "@portabletext/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from 'formik';
import axios from 'axios';

export const query = graphql`
query  {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      booksText {
        children {
          text
          marks
          _key
          _type
        }
        _type
        _key
      }
    }	
  }
`;

async function sendEmail(values) {
  try {
    await axios.post('/.netlify/functions/send-email', {
      ...values
    })
    return true
  } catch(err) {
    console.log(err)
    return false
  }
}

const ContactPage = props => {
  const { data, errors } = props;
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showCaptchaError, setShowCaptchaError] = useState(false);
  const [showForm, setShowForm] = useState(true);


  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.subject) {
      errors.subject = 'Required';
    }

    if (!values.message) {
      errors.message = 'Required';
    }
  
    return errors;
  };

  if (errors) {
    return (
      <Layout bgImage={bgImage}>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      if (!values.captcha) {
        setShowCaptchaError(true)
        return
      } 

      const emailSent = await sendEmail(values)
      if(emailSent) {
        setSubmitSuccess(true)
        setShowForm(false)
        setShowSubmitted(true)
        resetForm();
      } else {
        setSubmitSuccess(false)
        setShowSubmitted(true)
      }
    },
  });

  return (
    <Layout bgImage={bgImage} >
      <Container>
        <div className="flex flex-col sm:mx-10 bg-white/75 ">
          <h1 className="text-center text-dark-blue text-4xl">Contact Us</h1>
          <span className="text-center mb-5">
            contact@yafebeito.com<br/>
          </span>
          <span className="mx-4 mb-2">
            <div className="mb-2 text-xl">
              We can use your help!
            </div>
            <div className="mb-2">
              Should you notice any missing information or inaccuracies in class descriptions, please contact us using the form below. Be sure to reference the unique number at the start of each course title, and provide as much detail as possible. 
            </div>
            <div className="mb-2">
              Interested in getting involved in our project? We are looking for volunteers to write course outlines or full transcripts. Please contact us below to contribute.
            </div>
          </span>
          <form onSubmit={formik.handleSubmit} className={`flex flex-col gap-6 m-auto ${showForm ? "" : "hidden"} mx-4`}>
            <label htmlFor="name" className="">
              <span>Name</span>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="mt-1 block rounded-md w-full"
              />
              {formik.touched.name &&  formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
            </label>

            <label htmlFor="email" className="">
              <span>Email Address</span>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1 block rounded-md w-full"
              />
              {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
              </label>

            <label htmlFor="subject" className="">
              <span>Subject</span>
              <input
                id="subject"
                name="subject"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
                className="mt-1 block rounded-md w-full"
              />
              {formik.touched.subject && formik.errors.subject ? <div className="text-red-500">{formik.errors.subject}</div> : null}
              </label>
            <label htmlFor="message" className="">
              <span>Message</span>
              <textarea id="message"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="mt-1 block rounded-md w-full"
                />
              {formik.touched.message && formik.errors.message ? <div className="text-red-500">{formik.errors.message}</div> : null}
            </label>
            <ReCAPTCHA
              sitekey="6LeEpO4lAAAAAFf-40lpw3phmYBSbtFfXK-elK7E"
              onChange={(response) => { formik.setFieldValue("captcha", response); }}
            />
            {showCaptchaError ? <span id="captchaError" className="text-red-500">reCaptcha is Required!</span> : null}
            <div className="mb-3">
            <button type="submit" className="bg-dark-blue text-lg text-white hover:bg-white hover:text-dark-blue font-bold py-2 px-4 w-full h-10 rounded-md">Submit</button>
            </div>
          </form>
          {showSubmitted && submitSuccess ? <span id="submitSuccessMessage" className="text-center text-xl text-green-600 mb-3"><u>Thank you for submitting your message!</u></span> : null}
          {showSubmitted && !submitSuccess ? <span id="submitFailMessage" className="text-center text-red-500 mb-3">Error: Could not submit message!</span> : null}

        </div>
      </Container>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => (
  <SEO />
)