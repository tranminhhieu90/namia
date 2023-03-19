"use client";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import styles from "./page.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Countdown from "react-countdown";
import { useEffect, useRef } from "react";
import Modal from "react-modal";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { fakeNew } from "@/uititiles/fakeNews";
import emailjs from "@emailjs/browser";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Comments from "@/components/comments";
import { slideImages } from "@/uititiles/slideImages";
const schema = yup
  .object({
    name: yup.string(),
    phone: yup
      .string()
      .required()
      .matches(
        /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
        "Số điện thoại không đúng định dạng"
      ),
    comment: yup.string(),
  })
  .required();
const renderer_count_down = ({ days, hours, minutes, seconds, completed }) => {
  return (
    <div className={styles.count_down_block}>
      <div className={styles.count_down_item}>
        <p>0{days}</p>
        <h6>Days</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{hours}</p>
        <h6>Hours</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{minutes}</p>
        <h6>Min</h6>
      </div>
      <div className={styles.count_down_item}>
        <p>{seconds}</p>
        <h6>Sec</h6>
      </div>
    </div>
  );
};
export default function Home() {
  const myRef = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const createNotification = () => {
    const index = Math.floor(Math.random() * fakeNew.length);
    toast(
      <div className={styles.toasty}>
        <div className={styles.toasty_icon}>
          <div className={styles.toasty_circle}></div>
        </div>
        <div className={styles.toasty_content}>
          <p className={styles.toasty_title}>{fakeNew[index].phone}</p>
          <p className={styles.toasty_item}>{fakeNew[index].content}</p>
          <p className={styles.toasty_item}>{fakeNew[index].time}</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const timer = setInterval(() => createNotification(), 15000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    emailjs
      .send(
        "service_vxh6gbr",
        "template_vlkptwn",
        {
          name: data.name,
          phone: data.phone,
          comment: data.comment,
        },
        "GAKnrx8iiEtv58CiL"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    setIsOpen(true);
  };
  const settings = {
    customPaging: function (i) {
      return (
        <div className={styles.slide_paging}>
          <img src={slideImages[i]} />
        </div>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots-custom slick-thumb",
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="images/logo.png" />
        </div>
        <div
          className={styles.buy_now}
          style={{ margin: 0, marginRight: 20, width: 200 }}
          onClick={() => {
            myRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Kiến tạo cuộc sống
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.slogan}>
          <p>Điều hòa thông minh NAMIA</p>
        </div>
        <div className={styles.promotion}>
          <div className={styles.flash_sale}>
            <div className={styles.flash_sale_title}>FLASH SALE</div>
            <div className={styles.flash_sale_discount}>GIẢM 30%</div>
            <div className={styles.flash_sale_price}>
              <div className={styles.flash_sale_original_price}>5.450.000đ</div>
              <div className={styles.flash_sale_new_price}>3.449.000đ</div>
            </div>
          </div>
          <div className={styles.count_down}>
            <div>Ưu đãi kết thúc sau:</div>
            <Countdown
              date={Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 26}
              renderer={renderer_count_down}
            />
          </div>
        </div>
        <div
          className={styles.buy_now}
          onClick={() => {
            myRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Nhận Ưu Đãi
        </div>
      </div>
      <div className={styles.content_box}>
        <h3>Điều hòa all-in-one đầu tiên Việt Nam</h3>
        <p>
          <b>Điều hòa thông minh Namia</b> có thiết kế nhỏ gọn và linh động, nhưng tích hợp đầy đủ tính năng thông mini 3 trong 1 -  <b>Làm mát - Hút ẩm- Lọc không khí Công nghệ hút ẩm</b>
        </p>
      </div>
      <div className={styles.slide}>
        <Slider {...settings}>
          {slideImages.map((item, index) => {
            return (
              <div key={index} className={styles.home_slide_item}>
                <img alt="" src={item}/>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className={styles.product_detail}>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>CHI TIẾT SẢN PHẨM</div>
          <table className={styles.table}>
            <tr>
              <td>Mẫu mã</td>
              <td>WST-WK420A</td>
              <td>Dòng điện định mức</td>
              <td>1.34A</td>
            </tr>
            <tr>
              <td>Kiểu loại</td>
              <td>Mini/Di động</td>
              <td>Mức độ ồn</td>
              <td>≤38dB(A)</td>
            </tr>
            <tr>
              <td>Điều khiển</td>
              <td>Từ xa / Cảm ứng</td>
              <td>Gas làm lạnh</td>
              <td>R290a</td>
            </tr>
            <tr>
              <td>Chức năng</td>
              <td>Điều hòa / Quạt</td>
              <td>Kích thước máy</td>
              <td>400*300*225mm</td>
            </tr>
            <tr>
              <td>Công suất làm lạnh</td>
              <td>420W / 1,433Btu</td>
              <td>Kích thước đóng gói</td>
              <td>469*350*265mm</td>
            </tr>
            <tr>
              <td>Công suất tiêu thụ điện</td>
              <td>280W</td>
              <td>Khối lượng</td>
              <td>9kg/10kg</td>
            </tr>
            <tr>
              <td>Nguồn điện</td>
              <td>220V~50Hz/60Hz</td>
              <td>Dây cáp điện</td>
              <td>1,500mm</td>
            </tr>
          </table>
        </div>
        <div className={styles.product_block}>
          <div className={styles.product_detail_title}>TÍNH NĂNG</div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Máy nén piston hoạt động mạnh mẽ</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Làm mát nhanh</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Tùy chỉnh tốc độ quạt gió</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Gas R290a hiệu suất cao thân thiện với môi trường</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Tiết kiệm năng luợng</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Chế độ hút ẩm</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Động cơ DC không chổi than</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>{`Tiếng ồn thấp<38 dB (A)`}</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Thiết kế sang trọng phù hợp với mọi không gian</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Màn hình cảm ứng & điều khiển từ xa</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Công nghệ lọc không khí bằng ion âm độc quyền</b>
          </div>
          <div className={styles.product_detail_item}>
            <AiOutlineCheckCircle
              style={{
                marginRight: 10,
                fontSize: 26,
                color: "#0077ffd6",
                fontWeight: 700,
              }}
            />
            <b>Cánh đảo gió điều khiển bằng tay độc quyền</b>
          </div>
        </div>
      </div>
      <div ref={myRef}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
          <div className={styles.form_item}>
            <input
              className={styles.input_form}
              {...register("name")}
              placeholder="Họ Tên"
              autoComplete="do-not-autofill"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div className={styles.form_item}>
            <input
              className={styles.input_form}
              {...register("phone")}
              placeholder="Số điện thoại"
              autoComplete="do-not-autofill"
            />
            <p>{errors.phone?.message}</p>
          </div>
          <div className={styles.form_item}>
            <textarea
              className={styles.textarea_form}
              rows={5}
              {...register("comment")}
              placeholder="Phản hồi tới nhà phân phối"
            />
            <p>{errors.address?.message}</p>
          </div>
          <div className={styles.form_submit}>
            <button type="submit">Đặt Hàng Ngay</button>
          </div>
        </form>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Công nghệ hút ẩm</p>
          <h6>
            <b>Máy điều hòa thông minh Namia</b> tích hợp công nghệ hút ẩm, <b>tự động phát hiện độ ẩm</b> phòng theo thời gian thực. Khi độ ẩm quá cao máy sẽ tự động hút ẩm và ngừng lại khi độ ẩm đã đến ngưỡng cài đặt. Công nghệ hút ẩm sẽ giúp hút sạch không khí ẩm trong phòng, nhất là những ngày mưa hay mùa nồm, mang đến cho không gian khô thoáng, thoải mái, sạch sẽ. Hạn chế nấm mốc, bảo vệ sức khỏe các thành viên trong gia đình
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/hut-am.jpeg" />
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Tạo ion âm, ngăn ngừa virus nấm và vi khuẩn có hại</p>
          <h6>
            Điều hòa mini Namia không chỉ tạo bầu không khí mát mẻ mà tạo ion âm, đây là công nghệ đã được chứng minh có tác dụng diệt vi khuẩn, virus, nấm mốc, khử mùi, được nhiều nhà khoa học nghiên cứu ứng dụng làm sạch không khí. Với sức khỏe con người, ion âm còn có các lợi ích như tăng cường lưu thông máu, tăng cường hệ thống miễn dịch, làm giảm stress và sự lo lắng, tăng cường tập trung não bộ, cải thiện bệnh về đường hô hấp. Từ đó  ngăn ngừa kiểm soát bệnh truyền nhiễm trong không khí, bề mặt, giảm tỷ lệ mắc bệnh đường hô hấp như: Hen suyễn, viêm mũi ... Cho người sử dụng
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/ion.jpeg" />
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Làm mát nhanh chóng, hoạt đông êm ái</p>
          <h6>
            Công suất làm lạnh 420W / 1,433Btu cùng tính năng máy nén piston hoạt động mạnh mẽ đạt được tần số tối đa ngay từ khi khởi động để tăng tốc thời gian làm mát phòng. Nhờ vậy, bạn không phải chờ đợi quá lâu để tận hưởng những làn gió mát lạnh giữa ngày hè nắng nóng. Khả năng làm mát nhanh chóng cùng khả năng vận hành êm ái sẽ đảm bảo mang đến giấc ngủ êm đềm
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/dry.jpeg" />
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_content}>
          <p>Điều hòa mini chất lượng cao</p>
          <h6>
            Sản phẩm điều hòa mini Namia được ra mắt vào năm 2020, ngay lập tức đã trở thành sản phẩm hot trên thị trường và được nhiều người lựa chọn “giải nhiệt” cho mùa hè oi bức. Đây là dòng sản phẩm điều hòa rất Smart, nhờ thiết kế thông minh 2 bộ phận cục nóng và lạnh trên cùng 1 thiết bị, nên máy điều hòa mini không cần lắp đặt như các dòng gắn tường thông thường và có thể di chuyển linh động. Dòng điều hòa có thiết kế nhỏ gọn, linh động nhưng tích hợp đầy đủ tính năng thông minh 3 trong 1 - làm mát- hút ẩm- lọc không khí
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="https://s3.eu-west-1.amazonaws.com/www.bristolberlin.com/media/functions/image%20(5).jpg" />
        </div>
      </div>
      <Comments />
      
      <div className={styles.footer}>
        <div className={styles.footer_bg}></div>
        <div className={styles.footer_box}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.footer_logo}>
              <img src="images/logo.png" />
            </div>
          </div>
          <div className={styles.footer_title}>Đại lý uỷ quyền cấp</div>
          <div className={styles.footer_address}>
            Trường mầm non Thành Đông, 19 Tố Hữu, Trung Văn, Hà Nội.
          </div>
        </div>
        <div className={styles.footer_contact}>Tel: 0865856855</div>
        <div className={styles.footer_contact}>
          Email: dieuhoanamia@gmail.com
        </div>
        {/* <div className={styles.footer_contact}>Facebook: hieudz.fb.com</div> */}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
      >
        <div className={styles.modal_content}>
          <img src="images/success-icon.png" />
          <h6>ĐẶT HÀNG THÀNH CÔNG</h6>
          <p>
            Cám ơn quý khách đã mua hàng tại <span>namia.com.vn</span>
          </p>
          <p>
            Nhân viên chúng tôi sẽ sớm liên hệ với Quý khách trong thời gian sớm
            nhất.
          </p>
          <p>
            Nếu Quý Khách có thắc mắc, xin vui lòng liên hệ số hotline
            <a href={`tel:0865856855`}>
              <span>0865856855</span>.
            </a>
          </p>
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
      <ToastContainer
        className={styles.toast_container}
        bodyClassName={styles.toasty_body}
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeButton={false}
        limit={1}
      />
      <div className={styles.fix_tel}>
        <a href={`tel:0865856855`}>
          <FaPhoneAlt />
        </a>
      </div>
    </div>
  );
}
