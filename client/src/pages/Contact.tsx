import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi';

const Contact = () => {
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />

      <div className="store-wrapper w-full max-h-full bg-[#f5f5f7] pb-52">
        <div className="max-w-screen-2xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1264928439655!2d106.71188097583854!3d10.801622758726843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a459cb43ab%3A0x6c3d29d370b52a7e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVFAuSENNIChIVVRFQ0gpIC0gU2FpZ29uIENhbXB1cw!5e0!3m2!1svi!2s!4v1690427306921!5m2!1svi!2s"
            width="600"
            height="450"
            style={{
              border: '0',
              width: '100%',
              height: '500px',
              paddingTop: '50px',
              marginBottom: '30px',
            }}
            loading="lazy"
          ></iframe>
          <div className="grid grid-cols-2 bg-white  mb-10 rounded-xl gap-5">
            <div className="col-span-1 ml-10 mt-5">
              <h2 className="text-2xl font-bold mb-5">Contact</h2>
              <form action="" className="flex flex-col gap-5">
                <div className=" ">
                  <input type="text" className=" input" placeholder="Name" />
                </div>
                <div className="">
                  <input type="email" className=" input" placeholder="Email" />
                </div>
                <div className="">
                  <input
                    type="tel"
                    className=" input"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="">
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={5}
                    className=" bg-gray-100 py-2 pl-2   w-full rounded-lg flex placeholder:items-center"
                    placeholder="Comments"
                  ></textarea>
                </div>
                <div className="pb-10">
                  <button className="button">Submit</button>
                </div>
              </form>
            </div>
            <div className="col-span-1  mt-5">
              <h2 className="text-2xl font-bold mb-5">Get in Touch With Us</h2>
              <div className="">
                <ul>
                  <li className="mb-3 flex items-center gap-4 ">
                    <AiOutlineHome size={25} className="text-gray-400" />
                    <p className=" font-normal text-sm text-gray-400">
                      No. 210 Co Giang, P. Co Giang, Q.1, TPHCM
                    </p>
                  </li>
                  <li className="mb-3 flex items-center gap-4 ">
                    <BiPhoneCall size={25} className="text-gray-400" />
                    <a
                      className="font-normal text-sm text-gray-400"
                      href="tel:+84 213123123"
                    >
                      +84 213123123
                    </a>
                  </li>
                  <li className="mb-3 flex items-center gap-4 ">
                    <AiOutlineMail size={25} className="text-gray-400" />
                    <a
                      className="font-normal text-sm text-gray-400"
                      href="nnnt10122000@gmail.com"
                    >
                      nnnt10122000@gmail.com
                    </a>
                  </li>
                  <li className="mb-3 flex items-center gap-4 ">
                    <BiInfoCircle size={25} className="text-gray-400" />
                    <p className="font-normal text-sm text-gray-400">
                      Monday - Friday 10 AM - 8 PM
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
