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
import {  AiOutlineCheckCircle } from "react-icons/ai";
import Comments from "@/components/comments";
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
          <img src={`images/slide-${i + 1}.jpeg`} />
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
          style={{ margin: 0, marginRight: 20 }}
          onClick={() => {
            myRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Nhận Ưu Đãi
        </div>
      </div>
      <div className={styles.banner}>
        <div className={styles.slogan}>
          <p>Apple Watch</p>
          <span> ABC 4</span>
        </div>
        <div className={styles.promotion}>
          <div className={styles.flash_sale}>
            <div className={styles.flash_sale_title}>FLASH SALE</div>
            <div className={styles.flash_sale_discount}>GIẢM 30%</div>
            <div className={styles.flash_sale_price}>
              <div className={styles.flash_sale_original_price}>5.450.000đ</div>
              <div className={styles.flash_sale_new_price}>3.450.000đ</div>
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
        <h3>Mẫu xe máy điện thông minh đầu tiên</h3>
        <p>
          Đây là dòng xe được tích hợp nhiều công nghệ hiện đại bên trong thiết
          kế
        </p>
        <p>điệu đà nhưng giá bán lại phù hợp với đại đa số người Việt</p>
      </div>
      <div className={styles.slide}>
        <Slider {...settings}>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-1.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-2.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-3.jpeg" />
          </div>
          <div className={styles.home_slide_item}>
            <img alt="" src="images/slide-4.jpeg" />
          </div>
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
            Tự động phát hiện độ ẩm của phòng theo thời gian thực, máy sẽ ngừng
            hút ẩm khi đạt đến độ ẩm đã cài đặt. Nếu độ ẩm tăng lên cao hơn mức
            đó, máy sẽ tự động khởi động quá trình hút ẩm, giúp hạn chế nấm mốc,
            bảo vệ sức khỏe các thành viên trong gia đình bạn.
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
            Có thể chúng ta chưa biết, độ ẩm cao ảnh hưởng đến sức khỏe con
            người rất nhiều. Nếu như, độ ẩm cao trên 70% sẽ là môi trường lý
            tưởng để các loại nấm mốc, vi khuẩn, vi rút sinh sôi, nảy nở, thậm
            chí là các loại loại bọ bụi nhà. Từ đó con người sẽ bị các bệnh như
            như dị ứng da, viêm mũi, hen suyễn, đau mắt, viêm đường hô hấp...
          </h6>
        </div>
        <div className={styles.post_img}>
          <img src="images/ion.jpeg" />
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles.post_img}>
          <img src="images/dry.jpeg" />
        </div>
        <div className={styles.post_content}>
          <p>Làm mát nhanh chóng, hoạt đông êm ái</p>
          <h6>
            Làm mát nhanh, động cơ êm ái với độ ồn thấp , yên tĩnh đảm bảo giấc
            ngủ của bạn
          </h6>
        </div>
      </div>
      <Comments />
      <div className={styles.footer}>
        <div className={styles.footer_bg}></div>
        <div className={styles.footer_box}>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className={styles.footer_logo}>
              <img src="images/logo.png" />
            </div>
          </div>
          <div className={styles.footer_title}>
            VINFAST Klara – Đại lý uỷ quyền cấp 1
          </div>
          <div className={styles.footer_address}>
            Số 39A Nguyễn Trãi, Thượng Đình, Thanh Xuân, TP Hà Nội
          </div>
        </div>
        <div className={styles.footer_contact}>Tel: 0123 456 789</div>
        <div className={styles.footer_contact}>Email: example@gmail.com</div>
        <div className={styles.footer_contact}>Facebook: hieudz.fb.com</div>
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
            <span>19006969</span>.
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
        <a href={`tel:0356235391`}>
          <FaPhoneAlt />
        </a>
      </div>
    </div>
  );
}
