import React, { FunctionComponent, useContext, useRef, useState } from 'react';
import { AppContext } from '../App';
import { DocumentUploadComponent } from '../Components/DocumentUpload';
import { DocumentTypeSelector } from '../Components/DocumentTypeSelector';
import { FaSpinner } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';
import { createNotification } from '../Components/notificationHelper';
import { AskModal } from './Modal';

const Mark = (
  <div className="space-x-4 flex items center">
    <div className="">
      <svg
        width="294"
        height="19"
        viewBox="0 0 294 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.875 18H18.625V14.625C18.625 14.0781 18.6133 13.6094 18.5898 13.2188C18.5742 12.8203 18.5078 12.4805 18.3906 12.1992C18.2812 11.918 18.1055 11.6914 17.8633 11.5195C17.6211 11.3477 17.2773 11.2148 16.832 11.1211C16.3867 11.0273 15.8203 10.9648 15.1328 10.9336C14.4531 10.8945 13.6133 10.875 12.6133 10.875H2.5V18H0.25V0H12.9883C14.3633 0 15.5195 0.0507812 16.457 0.152344C17.4023 0.246094 18.1797 0.390625 18.7891 0.585938C19.4062 0.78125 19.8789 1.02344 20.207 1.3125C20.543 1.60156 20.7852 1.94141 20.9336 2.33203C21.0898 2.72266 21.1797 3.16016 21.2031 3.64453C21.2344 4.12891 21.25 4.66406 21.25 5.25C21.25 6 21.1953 6.66016 21.0859 7.23047C20.9844 7.79297 20.8086 8.27344 20.5586 8.67188C20.3086 9.07031 19.9766 9.39062 19.5625 9.63281C19.1484 9.86719 18.6289 10.0312 18.0039 10.125C18.6289 10.2188 19.1289 10.3828 19.5039 10.6172C19.8789 10.8516 20.168 11.1562 20.3711 11.5312C20.5742 11.9062 20.707 12.3516 20.7695 12.8672C20.8398 13.3828 20.875 13.9688 20.875 14.625V18ZM2.5 9H12.9883C13.9883 9 14.8281 8.98438 15.5078 8.95312C16.1953 8.91406 16.7617 8.84766 17.207 8.75391C17.6523 8.66016 17.9961 8.52734 18.2383 8.35547C18.4805 8.18359 18.6562 7.95703 18.7656 7.67578C18.8828 7.39453 18.9492 7.05859 18.9648 6.66797C18.9883 6.26953 19 5.79688 19 5.25C19 4.74219 18.9883 4.30469 18.9648 3.9375C18.9492 3.57031 18.8828 3.26172 18.7656 3.01172C18.6562 2.76172 18.4805 2.5625 18.2383 2.41406C17.9961 2.26562 17.6523 2.15234 17.207 2.07422C16.7617 1.98828 16.1953 1.93359 15.5078 1.91016C14.8281 1.88672 13.9883 1.875 12.9883 1.875H2.5V9ZM32.125 18.2578C30.625 18.2578 29.3516 18.1562 28.3047 17.9531C27.2578 17.7422 26.4062 17.3828 25.75 16.875C25.0938 16.3672 24.6172 15.6875 24.3203 14.8359C24.0234 13.9844 23.875 12.9141 23.875 11.625C23.875 10.1484 24.0234 8.92969 24.3203 7.96875C24.6172 7 25.0938 6.23047 25.75 5.66016C26.4062 5.08984 27.2578 4.69141 28.3047 4.46484C29.3516 4.23828 30.625 4.125 32.125 4.125C33.1953 4.125 34.1211 4.20313 34.9023 4.35938C35.6914 4.51562 36.3633 4.74219 36.918 5.03906C37.4805 5.33594 37.9336 5.69531 38.2773 6.11719C38.6289 6.53906 38.9023 6.98438 39.0977 7.45312C39.3008 7.91406 39.4375 8.45703 39.5078 9.08203C39.5859 9.70703 39.625 10.3672 39.625 11.0625L39.4375 11.8125H26.125C26.125 12.8438 26.2266 13.6914 26.4297 14.3555C26.6328 15.0117 26.9688 15.4922 27.4375 15.7969C27.9062 16.1016 28.5234 16.2969 29.2891 16.3828C30.0547 16.4609 31 16.5 32.125 16.5C33.1562 16.5 34.0078 16.4727 34.6797 16.418C35.3594 16.3555 35.8984 16.2422 36.2969 16.0781C36.6953 15.9141 36.9727 15.6875 37.1289 15.3984C37.293 15.1016 37.375 14.7188 37.375 14.25H39.625C39.625 14.9766 39.4961 15.5977 39.2383 16.1133C38.9883 16.6211 38.5703 17.0352 37.9844 17.3555C37.3984 17.668 36.625 17.8945 35.6641 18.0352C34.7109 18.1836 33.5312 18.2578 32.125 18.2578ZM32.125 6C31.375 6 30.7031 6.01562 30.1094 6.04688C29.5234 6.07812 29.0078 6.14844 28.5625 6.25781C28.125 6.35938 27.75 6.51172 27.4375 6.71484C27.125 6.91016 26.8711 7.14453 26.6758 7.41797C26.4883 7.68359 26.3477 8.0625 26.2539 8.55469C26.168 9.03906 26.125 9.625 26.125 10.3125H37.375C37.375 9.39844 37.2773 8.68359 37.082 8.16797C36.8867 7.64453 36.5781 7.21484 36.1562 6.87891C35.7344 6.54297 35.1914 6.3125 34.5273 6.1875C33.8633 6.0625 33.0625 6 32.125 6ZM48.25 18L41.125 4.5H43.75L49.75 16.5L55.75 4.5H58.375L51.25 18H48.25ZM61.375 4.5H63.625V18H61.375V4.5ZM63.625 2.25H61.375V0H63.625V2.25ZM75.25 18.2578C73.75 18.2578 72.4766 18.1562 71.4297 17.9531C70.3828 17.7422 69.5312 17.3828 68.875 16.875C68.2188 16.3672 67.7422 15.6875 67.4453 14.8359C67.1484 13.9844 67 12.9141 67 11.625C67 10.1484 67.1484 8.92969 67.4453 7.96875C67.7422 7 68.2188 6.23047 68.875 5.66016C69.5312 5.08984 70.3828 4.69141 71.4297 4.46484C72.4766 4.23828 73.75 4.125 75.25 4.125C76.3203 4.125 77.2461 4.20313 78.0273 4.35938C78.8164 4.51562 79.4883 4.74219 80.043 5.03906C80.6055 5.33594 81.0586 5.69531 81.4023 6.11719C81.7539 6.53906 82.0273 6.98438 82.2227 7.45312C82.4258 7.91406 82.5625 8.45703 82.6328 9.08203C82.7109 9.70703 82.75 10.3672 82.75 11.0625L82.5625 11.8125H69.25C69.25 12.8438 69.3516 13.6914 69.5547 14.3555C69.7578 15.0117 70.0938 15.4922 70.5625 15.7969C71.0312 16.1016 71.6484 16.2969 72.4141 16.3828C73.1797 16.4609 74.125 16.5 75.25 16.5C76.2812 16.5 77.1328 16.4727 77.8047 16.418C78.4844 16.3555 79.0234 16.2422 79.4219 16.0781C79.8203 15.9141 80.0977 15.6875 80.2539 15.3984C80.418 15.1016 80.5 14.7188 80.5 14.25H82.75C82.75 14.9766 82.6211 15.5977 82.3633 16.1133C82.1133 16.6211 81.6953 17.0352 81.1094 17.3555C80.5234 17.668 79.75 17.8945 78.7891 18.0352C77.8359 18.1836 76.6562 18.2578 75.25 18.2578ZM75.25 6C74.5 6 73.8281 6.01562 73.2344 6.04688C72.6484 6.07812 72.1328 6.14844 71.6875 6.25781C71.25 6.35938 70.875 6.51172 70.5625 6.71484C70.25 6.91016 69.9961 7.14453 69.8008 7.41797C69.6133 7.68359 69.4727 8.0625 69.3789 8.55469C69.293 9.03906 69.25 9.625 69.25 10.3125H80.5C80.5 9.39844 80.4023 8.68359 80.207 8.16797C80.0117 7.64453 79.7031 7.21484 79.2812 6.87891C78.8594 6.54297 78.3164 6.3125 77.6523 6.1875C76.9883 6.0625 76.1875 6 75.25 6ZM109 4.5L103.75 18H100.75L96.625 6.9375L92.5 18H89.5L84.25 4.5H86.875L91 16.3125L95.5 4.5H97.75L102.203 16.3125L106.375 4.5H109ZM136.75 0V1.875H127.75V18H125.5V1.875H116.5V0H136.75ZM151.375 8.89453C151.375 8.33203 151.332 7.86719 151.246 7.5C151.168 7.125 150.977 6.82812 150.672 6.60938C150.367 6.38281 149.914 6.22656 149.312 6.14062C148.719 6.04688 147.906 6 146.875 6C145.867 6 145.047 6.08984 144.414 6.26953C143.781 6.44141 143.285 6.6875 142.926 7.00781C142.566 7.32812 142.32 7.71094 142.188 8.15625C142.062 8.60156 142 9.09766 142 9.64453V18H139.75V4.5H142V6.64453C142.078 6.40234 142.223 6.13672 142.434 5.84766C142.645 5.55078 142.965 5.27734 143.395 5.02734C143.824 4.76953 144.379 4.55469 145.059 4.38281C145.746 4.21094 146.602 4.125 147.625 4.125C148.797 4.125 149.75 4.23047 150.484 4.44141C151.219 4.64453 151.789 4.94922 152.195 5.35547C152.609 5.75391 152.887 6.25 153.027 6.84375C153.176 7.4375 153.25 8.12109 153.25 8.89453H151.375ZM168.191 16.1484C168.168 16.2422 167.992 16.4766 167.664 16.8516C167.43 17.1328 167.117 17.3828 166.727 17.6016C166.336 17.8125 165.812 17.9766 165.156 18.0938C164.508 18.2188 163.652 18.2812 162.59 18.2812C161.176 18.2812 159.969 18.207 158.969 18.0586C157.969 17.918 157.152 17.6992 156.52 17.4023C155.887 17.0977 155.422 16.7109 155.125 16.2422C154.836 15.7734 154.691 15.2148 154.691 14.5664C154.691 13.8867 154.77 13.3125 154.926 12.8438C155.09 12.3672 155.324 11.9688 155.629 11.6484C155.941 11.3281 156.316 11.0781 156.754 10.8984C157.191 10.7188 157.688 10.582 158.242 10.4883C158.805 10.3945 159.418 10.3359 160.082 10.3125C160.746 10.2891 161.453 10.2773 162.203 10.2773C163.273 10.2773 164.168 10.3242 164.887 10.418C165.605 10.5039 166.191 10.6172 166.645 10.7578C167.105 10.8906 167.453 11.0352 167.688 11.1914C167.922 11.3477 168.09 11.4922 168.191 11.625C168.191 10.75 168.152 10.0039 168.074 9.38672C168.004 8.76953 167.883 8.25391 167.711 7.83984C167.547 7.42578 167.332 7.09766 167.066 6.85547C166.801 6.60547 166.473 6.41797 166.082 6.29297C165.699 6.16797 165.25 6.08984 164.734 6.05859C164.219 6.01953 163.629 6 162.965 6C161.934 6 161.078 6.02734 160.398 6.08203C159.719 6.12891 159.18 6.22656 158.781 6.375C158.383 6.52344 158.102 6.73047 157.938 6.99609C157.773 7.25391 157.691 7.59375 157.691 8.01562H155.441C155.441 7.30469 155.566 6.70312 155.816 6.21094C156.074 5.71875 156.496 5.32031 157.082 5.01562C157.676 4.70312 158.453 4.47656 159.414 4.33594C160.375 4.19531 161.559 4.125 162.965 4.125C164.34 4.125 165.504 4.23828 166.457 4.46484C167.41 4.69141 168.18 5.08984 168.766 5.66016C169.359 6.23047 169.785 7 170.043 7.96875C170.309 8.92969 170.441 10.1484 170.441 11.625V18H168.191V16.1484ZM162.965 16.5C163.957 16.5 164.785 16.4531 165.449 16.3594C166.121 16.2656 166.66 16.125 167.066 15.9375C167.473 15.75 167.762 15.5156 167.934 15.2344C168.105 14.9531 168.191 14.625 168.191 14.25C168.191 13.875 168.09 13.5586 167.887 13.3008C167.691 13.0352 167.359 12.8203 166.891 12.6562C166.43 12.4922 165.816 12.375 165.051 12.3047C164.285 12.2266 163.34 12.1875 162.215 12.1875C161.09 12.1875 160.18 12.207 159.484 12.2461C158.797 12.2852 158.266 12.375 157.891 12.5156C157.516 12.6562 157.262 12.8633 157.129 13.1367C157.004 13.4102 156.941 13.7812 156.941 14.25C156.941 14.7188 157.008 15.1016 157.141 15.3984C157.281 15.6875 157.562 15.9141 157.984 16.0781C158.406 16.2422 159.012 16.3555 159.801 16.418C160.598 16.4727 161.652 16.5 162.965 16.5ZM186.953 18V10.5C186.953 9.66406 186.891 8.96094 186.766 8.39062C186.641 7.8125 186.391 7.34766 186.016 6.99609C185.641 6.64453 185.109 6.39062 184.422 6.23438C183.734 6.07812 182.828 6 181.703 6C180.484 6 179.484 6.08984 178.703 6.26953C177.93 6.44922 177.32 6.70312 176.875 7.03125C176.43 7.35938 176.121 7.75391 175.949 8.21484C175.785 8.67578 175.703 9.1875 175.703 9.75V18H173.453V4.5H175.703V6.75C175.867 6.36719 176.102 6.03906 176.406 5.76562C176.711 5.48438 177.055 5.24609 177.438 5.05078C177.82 4.85547 178.234 4.69922 178.68 4.58203C179.125 4.45703 179.57 4.36328 180.016 4.30078C180.461 4.23047 180.891 4.18359 181.305 4.16016C181.727 4.13672 182.109 4.125 182.453 4.125C183.453 4.125 184.312 4.1875 185.031 4.3125C185.758 4.4375 186.371 4.62109 186.871 4.86328C187.379 5.10547 187.785 5.40625 188.09 5.76562C188.395 6.125 188.629 6.54297 188.793 7.01953C188.965 7.48828 189.078 8.01562 189.133 8.60156C189.188 9.17969 189.215 9.8125 189.215 10.5L189.203 18H186.953ZM200.102 11.8477C199.039 11.8477 198.105 11.832 197.301 11.8008C196.496 11.7695 195.801 11.707 195.215 11.6133C194.637 11.5117 194.152 11.3711 193.762 11.1914C193.379 11.0117 193.074 10.7734 192.848 10.4766C192.621 10.1719 192.461 9.80078 192.367 9.36328C192.273 8.91797 192.227 8.4375 192.227 7.92188C192.227 7.21875 192.375 6.62891 192.672 6.15234C192.969 5.66797 193.445 5.27734 194.102 4.98047C194.758 4.67578 195.609 4.45703 196.656 4.32422C197.703 4.19141 198.977 4.125 200.477 4.125C201.961 4.125 203.184 4.20313 204.145 4.35938C205.113 4.51562 205.879 4.75781 206.441 5.08594C207.012 5.40625 207.41 5.8125 207.637 6.30469C207.863 6.79688 207.977 7.38281 207.977 8.0625H205.727C205.727 7.64062 205.645 7.29688 205.48 7.03125C205.324 6.76562 205.047 6.55859 204.648 6.41016C204.25 6.25391 203.711 6.14844 203.031 6.09375C202.359 6.03125 201.508 6 200.477 6C199.352 6 198.406 6.01562 197.641 6.04688C196.875 6.07812 196.258 6.15625 195.789 6.28125C195.32 6.40625 194.984 6.59766 194.781 6.85547C194.578 7.11328 194.477 7.46875 194.477 7.92188C194.477 8.1875 194.492 8.44922 194.523 8.70703C194.562 8.95703 194.645 9.16406 194.77 9.32812C194.895 9.49219 195.078 9.61719 195.32 9.70312C195.562 9.78906 195.891 9.85547 196.305 9.90234C196.727 9.94141 197.246 9.96484 197.863 9.97266C198.48 9.97266 199.227 9.97266 200.102 9.97266C201.164 9.97266 202.094 9.99609 202.891 10.043C203.695 10.0898 204.391 10.1719 204.977 10.2891C205.562 10.4062 206.047 10.5859 206.43 10.8281C206.812 11.0703 207.117 11.3359 207.344 11.625C207.578 11.9062 207.742 12.2422 207.836 12.6328C207.93 13.0156 207.977 13.4609 207.977 13.9688C207.977 14.4766 207.93 14.9336 207.836 15.3398C207.742 15.7383 207.578 16.0938 207.344 16.4062C207.109 16.7109 206.789 16.9766 206.383 17.2031C205.984 17.4219 205.48 17.6016 204.871 17.7422C204.262 17.875 203.531 17.9727 202.68 18.0352C201.836 18.1055 200.852 18.1406 199.727 18.1406C198.32 18.1406 197.137 18.0703 196.176 17.9297C195.223 17.7891 194.453 17.5664 193.867 17.2617C193.281 16.9492 192.859 16.5469 192.602 16.0547C192.352 15.5625 192.227 14.9609 192.227 14.25H194.477C194.477 14.7188 194.555 15.1016 194.711 15.3984C194.875 15.6875 195.156 15.9141 195.555 16.0781C195.953 16.2422 196.488 16.3555 197.16 16.418C197.84 16.4727 198.695 16.5 199.727 16.5C200.664 16.5 201.461 16.4805 202.117 16.4414C202.781 16.3945 203.336 16.3242 203.781 16.2305C204.227 16.1367 204.578 16.0234 204.836 15.8906C205.094 15.7578 205.289 15.5977 205.422 15.4102C205.555 15.2227 205.637 15.0156 205.668 14.7891C205.707 14.5547 205.727 14.2969 205.727 14.0156C205.727 13.7578 205.707 13.5312 205.668 13.3359C205.637 13.1328 205.559 12.9336 205.434 12.7383C205.309 12.5352 205.125 12.3828 204.883 12.2812C204.641 12.1797 204.309 12.0977 203.887 12.0352C203.473 11.9648 202.957 11.918 202.34 11.8945C201.723 11.8633 200.977 11.8477 200.102 11.8477ZM211.727 0H213.977V18H211.727V0ZM231.168 16.1484C231.145 16.2422 230.969 16.4766 230.641 16.8516C230.406 17.1328 230.094 17.3828 229.703 17.6016C229.312 17.8125 228.789 17.9766 228.133 18.0938C227.484 18.2188 226.629 18.2812 225.566 18.2812C224.152 18.2812 222.945 18.207 221.945 18.0586C220.945 17.918 220.129 17.6992 219.496 17.4023C218.863 17.0977 218.398 16.7109 218.102 16.2422C217.812 15.7734 217.668 15.2148 217.668 14.5664C217.668 13.8867 217.746 13.3125 217.902 12.8438C218.066 12.3672 218.301 11.9688 218.605 11.6484C218.918 11.3281 219.293 11.0781 219.73 10.8984C220.168 10.7188 220.664 10.582 221.219 10.4883C221.781 10.3945 222.395 10.3359 223.059 10.3125C223.723 10.2891 224.43 10.2773 225.18 10.2773C226.25 10.2773 227.145 10.3242 227.863 10.418C228.582 10.5039 229.168 10.6172 229.621 10.7578C230.082 10.8906 230.43 11.0352 230.664 11.1914C230.898 11.3477 231.066 11.4922 231.168 11.625C231.168 10.75 231.129 10.0039 231.051 9.38672C230.98 8.76953 230.859 8.25391 230.688 7.83984C230.523 7.42578 230.309 7.09766 230.043 6.85547C229.777 6.60547 229.449 6.41797 229.059 6.29297C228.676 6.16797 228.227 6.08984 227.711 6.05859C227.195 6.01953 226.605 6 225.941 6C224.91 6 224.055 6.02734 223.375 6.08203C222.695 6.12891 222.156 6.22656 221.758 6.375C221.359 6.52344 221.078 6.73047 220.914 6.99609C220.75 7.25391 220.668 7.59375 220.668 8.01562H218.418C218.418 7.30469 218.543 6.70312 218.793 6.21094C219.051 5.71875 219.473 5.32031 220.059 5.01562C220.652 4.70312 221.43 4.47656 222.391 4.33594C223.352 4.19531 224.535 4.125 225.941 4.125C227.316 4.125 228.48 4.23828 229.434 4.46484C230.387 4.69141 231.156 5.08984 231.742 5.66016C232.336 6.23047 232.762 7 233.02 7.96875C233.285 8.92969 233.418 10.1484 233.418 11.625V18H231.168V16.1484ZM225.941 16.5C226.934 16.5 227.762 16.4531 228.426 16.3594C229.098 16.2656 229.637 16.125 230.043 15.9375C230.449 15.75 230.738 15.5156 230.91 15.2344C231.082 14.9531 231.168 14.625 231.168 14.25C231.168 13.875 231.066 13.5586 230.863 13.3008C230.668 13.0352 230.336 12.8203 229.867 12.6562C229.406 12.4922 228.793 12.375 228.027 12.3047C227.262 12.2266 226.316 12.1875 225.191 12.1875C224.066 12.1875 223.156 12.207 222.461 12.2461C221.773 12.2852 221.242 12.375 220.867 12.5156C220.492 12.6562 220.238 12.8633 220.105 13.1367C219.98 13.4102 219.918 13.7812 219.918 14.25C219.918 14.7188 219.984 15.1016 220.117 15.3984C220.258 15.6875 220.539 15.9141 220.961 16.0781C221.383 16.2422 221.988 16.3555 222.777 16.418C223.574 16.4727 224.629 16.5 225.941 16.5ZM249.555 12C249.555 13.1484 249.461 14.1094 249.273 14.8828C249.086 15.6484 248.77 16.2617 248.324 16.7227C247.887 17.1836 247.309 17.5117 246.59 17.707C245.871 17.9023 244.984 18 243.93 18C242.906 18 242.047 17.9219 241.352 17.7656C240.656 17.6094 240.094 17.3438 239.664 16.9688C239.234 16.5938 238.926 16.0938 238.738 15.4688C238.551 14.8438 238.457 14.0625 238.457 13.125V6.35156H235.68V4.5H238.457V0.808594H240.707V4.5H249.18V6.35156H240.707V13.125C240.707 13.875 240.762 14.4531 240.871 14.8594C240.988 15.2656 241.172 15.5625 241.422 15.75C241.672 15.9375 242 16.0469 242.406 16.0781C242.82 16.1094 243.324 16.125 243.918 16.125C244.387 16.125 244.805 16.1172 245.172 16.1016C245.547 16.0859 245.871 16.0391 246.145 15.9609C246.426 15.875 246.664 15.75 246.859 15.5859C247.055 15.4141 247.211 15.1758 247.328 14.8711C247.453 14.5664 247.543 14.1836 247.598 13.7227C247.652 13.2539 247.68 12.6797 247.68 12H249.555ZM253.305 4.5H255.555V18H253.305V4.5ZM255.555 2.25H253.305V0H255.555V2.25ZM258.93 11.1562C258.93 9.77344 259.078 8.62891 259.375 7.72266C259.672 6.81641 260.148 6.09766 260.805 5.56641C261.461 5.03516 262.312 4.66406 263.359 4.45312C264.406 4.23437 265.68 4.125 267.18 4.125C268.68 4.125 269.953 4.23437 271 4.45312C272.047 4.66406 272.898 5.03516 273.555 5.56641C274.211 6.09766 274.688 6.81641 274.984 7.72266C275.281 8.62891 275.43 9.77344 275.43 11.1562C275.43 12.5391 275.281 13.6875 274.984 14.6016C274.688 15.5156 274.211 16.2422 273.555 16.7812C272.898 17.3203 272.047 17.7031 271 17.9297C269.953 18.1484 268.68 18.2578 267.18 18.2578C265.68 18.2578 264.406 18.1484 263.359 17.9297C262.312 17.7031 261.461 17.3203 260.805 16.7812C260.148 16.2422 259.672 15.5156 259.375 14.6016C259.078 13.6875 258.93 12.5391 258.93 11.1562ZM261.18 11.1562C261.18 11.9062 261.207 12.5586 261.262 13.1133C261.316 13.668 261.418 14.1445 261.566 14.543C261.723 14.9414 261.938 15.2656 262.211 15.5156C262.484 15.7656 262.844 15.9648 263.289 16.1133C263.734 16.2617 264.273 16.3633 264.906 16.418C265.547 16.4727 266.305 16.5 267.18 16.5C267.93 16.5 268.598 16.4844 269.184 16.4531C269.777 16.4141 270.293 16.332 270.73 16.207C271.176 16.082 271.555 15.9062 271.867 15.6797C272.18 15.4453 272.43 15.1289 272.617 14.7305C272.812 14.332 272.953 13.8438 273.039 13.2656C273.133 12.6797 273.18 11.9766 273.18 11.1562C273.18 10.3516 273.133 9.66797 273.039 9.10547C272.953 8.53516 272.812 8.05859 272.617 7.67578C272.43 7.29297 272.18 6.99219 271.867 6.77344C271.555 6.54688 271.176 6.37891 270.73 6.26953C270.293 6.15234 269.777 6.07812 269.184 6.04688C268.598 6.01562 267.93 6 267.18 6C266.43 6 265.758 6.01562 265.164 6.04688C264.578 6.07812 264.062 6.15234 263.617 6.26953C263.18 6.37891 262.805 6.54688 262.492 6.77344C262.18 6.99219 261.926 7.29297 261.73 7.67578C261.543 8.05859 261.402 8.53516 261.309 9.10547C261.223 9.66797 261.18 10.3516 261.18 11.1562ZM291.555 18V10.5C291.555 9.66406 291.492 8.96094 291.367 8.39062C291.242 7.8125 290.992 7.34766 290.617 6.99609C290.242 6.64453 289.711 6.39062 289.023 6.23438C288.336 6.07812 287.43 6 286.305 6C285.086 6 284.086 6.08984 283.305 6.26953C282.531 6.44922 281.922 6.70312 281.477 7.03125C281.031 7.35938 280.723 7.75391 280.551 8.21484C280.387 8.67578 280.305 9.1875 280.305 9.75V18H278.055V4.5H280.305V6.75C280.469 6.36719 280.703 6.03906 281.008 5.76562C281.312 5.48438 281.656 5.24609 282.039 5.05078C282.422 4.85547 282.836 4.69922 283.281 4.58203C283.727 4.45703 284.172 4.36328 284.617 4.30078C285.062 4.23047 285.492 4.18359 285.906 4.16016C286.328 4.13672 286.711 4.125 287.055 4.125C288.055 4.125 288.914 4.1875 289.633 4.3125C290.359 4.4375 290.973 4.62109 291.473 4.86328C291.98 5.10547 292.387 5.40625 292.691 5.76562C292.996 6.125 293.23 6.54297 293.395 7.01953C293.566 7.48828 293.68 8.01562 293.734 8.60156C293.789 9.17969 293.816 9.8125 293.816 10.5L293.805 18H291.555Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
);

interface DocComponentProps {
  children: React.ReactNode;
}
interface DocProps {
  isUploaded: boolean;
  docID: string;
}
const KFS2DocComponent: FunctionComponent<DocComponentProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [engDocUploaded, setEngDocUploaded] = useState<DocProps>({
    isUploaded: false,
    docID: '',
  });
  const [chDocUploaded, setChDocUploaded] = useState<DocProps>({
    isUploaded: false,
    docID: '',
  });
  const [resDocID, setResDocID] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultURL, setResultURL] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleUpgradePageStep = (newPage: number) => {
    setCurrentStep(newPage);
  };
  const handleSetEngDocInfo = (newState: boolean, docID: string) => {
    setEngDocUploaded({ isUploaded: newState, docID: docID });
  };
  const handleSetChDocInfo = (newState: boolean, docID: string) => {
    setChDocUploaded({ isUploaded: newState, docID: docID });
  };

  const handleReview = async () => {
    setIsLoading(true);
    const url = 'http://172.104.33.232:8000/project/review-two';
    const data = {
      en_doc_id: engDocUploaded.docID,
      zh_doc_id: chDocUploaded.docID,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        createNotification("danger", "", "Review failed");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, result.document_id);
      setResDocID(result.document_id);
      const downPdfURL = `http://172.104.33.232:8000/project/download/pdf/${result.document_id}`;
      fetch(downPdfURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            createNotification("danger", "", "Review failed");
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          createNotification("success", "", "Review success");
          handleUpgradePageStep(currentStep + 1);
          return response.blob();
        })
        .then((blob) => {
          const pdfUrl = URL.createObjectURL(blob);
          console.log(pdfUrl);
          setResultURL(pdfUrl);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching the PDF:', error);
        });
    } catch (error) {
      console.error('Error reviewing:', error);
    }
  };

  const handleDownload = async () => {
    const downloadURL = `http://172.104.33.232:8000/project/download/${resDocID}`;
    const response = await fetch(downloadURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('auth-token')}`,
      },
    });
    if (!response.ok) {
      createNotification("danger", "", "Downloading failed");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, result.link);

    try {
      // Replace 'fileUrl' with your file link

      // Fetching the file
      const response = await fetch(result.link);
      const blob = await response.blob();

      // Creating a temporary link to trigger the download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'downloadedFile'; // Set the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      createNotification("danger", "", "Downloading Error");
      console.error('Error downloading the file: ', error);
    }
  };
  const handlePrevBtnClick = async() => {
    setModalIsOpen(true);

  };
  const handleOk = () => {
    console.log('OK clicked');
    setCurrentStep(1);
    setModalIsOpen(false);
  };

  const handleClose = () => {
    console.log('Close clicked');
    setModalIsOpen(false);
    // Additional logic for Close action
  };
  const stepOne = (
    <>
      <div className="flex justify-between px-4">
        <div>Upload 1 English document and 1 Chinese document</div>
      </div>
      <div
        className="flex justify-evenly w-full"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <div className="w-1/2 p-1">
          <DocumentUploadComponent
            mode="English"
            isUploaded={engDocUploaded.isUploaded}
            setIsUploaded={handleSetEngDocInfo}
          />
        </div>
        <div className="w-1/2 p-1">
          <DocumentUploadComponent
            mode="Chinese"
            isUploaded={chDocUploaded.isUploaded}
            setIsUploaded={handleSetChDocInfo}
          />
        </div>
      </div>
      <div className="w-full h-24 bg-[#1B1D2A] rounded flex justify-end p-5 font-bold">
        <button
          className="bg-[#306BF3] border-solid border border-[#252637] flex items-center justify-between"
          onClick={handleReview}
          disabled={isLoading}
        >
          {isLoading ? <FaSpinner className="spin-animation" /> : <>Review</>}
        </button>
      </div>
    </>
  );
  const stepTwo = (
    <>
      <div className="h-full flex space-x-4 justify-evenly">
        {isLoading ? (
          <div className="h-full w-[80%] flex justify-center items-center">
            <FaSpinner className="spin-animation" size={70} />
          </div>
        ) : (
          <object
            className="pdf-previewer custom-scroll"
            data={resultURL}
            type="application/pdf"
            width="80%"
            height="100%"
          >
            <p>
              Your browser does not support PDFs.
              <a href={resultURL}>Download the PDF</a>.
            </p>
          </object>
        )}
        <div className="flex flex-col space-y-4 w-[20%]">
          <div className="text-sm font-normal leading-normal text-stone-400 font-sans">
            You have uploaded the following two documents for review. Please
            check the review results on the left column.
          </div>
          <div className="w-full border border-slate-600 p-2 flex items-center text-stone-400 overflow-hidden justify-start space-x-2 bold flex-nowrap">
            <div>
              <FaFilePdf />
            </div>
            <div className="text-sm ">{engDocUploaded.docID}</div>
          </div>
          <div className="w-full border border-slate-600 p-2 flex items-center text-stone-400 overflow-hidden justify-start space-x-2 bold flex-nowrap">
            <div>
              <FaFilePdf />
            </div>
            <div className="text-sm ">{chDocUploaded.docID}</div>
          </div>
          <div
            className="w-full border border-slate-600 p-2 flex items-center text-white bg-[#3371BC] hover:bg-[#2C63A0] active:bg-[#1E4D80] overflow-hidden justify-center font-bold text-sm cursor-pointer space-x-2"
            onClick={handleDownload}
          >
            Download
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-5 h-full">
      <div className="flex space-x-4">
        {currentStep !== 1 && (
          <FaChevronLeft
            className="cursor-pointer"
            onClick={handlePrevBtnClick}
          />
        )}
        {Mark}
      </div>
      <div className="w-full border-t border-white-500 my-5" />
      {currentStep === 1 && children}
      <div
        className="w-full h-full rounded-2xl bg-[#262732] p-5 text-2xl	space-y-4"
        style={{ height: 'calc(100% - 110px)' }}
      > 
        {currentStep === 1 && stepOne}
        {currentStep === 2 && stepTwo}
        <AskModal isOpen={modalIsOpen} onOk={handleOk} onClose={handleClose} />
      </div>
    </div>
  );
};
const KFS1DocComponent: FunctionComponent<DocComponentProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [DocUploaded, setDocUploaded] = useState<DocProps>({
    isUploaded: false,
    docID: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resDocID, setResDocID] = useState<string>('');
  const [resultURL, setResultURL] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleUpgradePageStep = (newPage: number) => {
    setCurrentStep(newPage);
  };

  const handleSetEngDocInfo = (newState: boolean, docID: string) => {
    setDocUploaded({ isUploaded: newState, docID: docID });
  };
  const handleReview = async () => {
    setIsLoading(true);
    const url = 'http://172.104.33.232:8000/project/review-one';
    const data = {
      single_doc_id: DocUploaded.docID,
    };
    console.log(data);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, result.document_id);
      setResDocID(result.document_id);
      const downPdfURL = `http://172.104.33.232:8000/project/download/pdf/${result.document_id}`;
      fetch(downPdfURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setIsLoading(false);
          handleUpgradePageStep(currentStep + 1);

          return response.blob();
        })
        .then((blob) => {
          const pdfUrl = URL.createObjectURL(blob);
          console.log(pdfUrl);
          setResultURL(pdfUrl);
        })
        .catch((error) => {
          console.error('Error fetching the PDF:', error);
        });
    } catch (error) {
      console.error('Error reviewing:', error);
    }
  };

  const handleDownload = async () => {
    const downloadURL = `http://172.104.33.232:8000/project/download/${resDocID}`;
    const response = await fetch(downloadURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('auth-token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result, result.link);

    try {
      // Replace 'fileUrl' with your file link

      // Fetching the file
      const response = await fetch(result.link);
      const blob = await response.blob();

      // Creating a temporary link to trigger the download
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'downloadedFile'; // Set the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file: ', error);
    }
  };

  const handlePrevBtnClick = async() => {
    setModalIsOpen(true);

  };
  const handleOk = () => {
    console.log('OK clicked');
    setCurrentStep(1);
    setModalIsOpen(false);
  };

  const handleClose = () => {
    console.log('Close clicked');
    setModalIsOpen(false);
    // Additional logic for Close action
  };
  const stepOne = (
    <>
      <div>Upload Single KFS document</div>
      <div
        className="flex justify-evenly w-full"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <DocumentUploadComponent
          mode="Single KFS"
          isUploaded={DocUploaded.isUploaded}
          setIsUploaded={handleSetEngDocInfo}
        ></DocumentUploadComponent>
      </div>
      <div className="w-full h-24 bg-[#1B1D2A] rounded flex justify-end p-5 font-bold">
        <button
          className="bg-[#306BF3] border-solid border border-[#252637] flex items-center justify-between"
          onClick={handleReview}
          disabled={isLoading}
        >
          {isLoading && <FaSpinner className="spin-animation" />}
          Review
        </button>
      </div>
    </>
  );
  const stepTwo = (
    <div className="h-full flex space-x-4 justify-evenly">
      {isLoading ? (
        <div className="h-full w-[80%] flex justify-center items-center">
          <FaSpinner className="spin-animation" size={70} />
        </div>
      ) : (
        <object
          className="pdf-previewer custom-scroll"
          data={resultURL}
          type="application/pdf"
          width="80%"
          height="100%"
        >
          <p>
            Your browser does not support PDFs.
            <a href={resultURL}>Download the PDF</a>.
          </p>
        </object>
      )}
      <div className="flex flex-col space-y-4 w-[20%]">
        <div className="text-sm font-normal leading-normal text-stone-400 font-sans">
          You have uploaded the following one document for review. Please check
          the review results on the left column.
        </div>
        <div className="w-full border border-slate-600 p-2 flex items-center text-stone-400 overflow-hidden justify-start space-x-2 bold flex-nowrap">
          <div>
            <FaFilePdf />
          </div>
          <div className="text-sm ">{DocUploaded.docID}</div>
        </div>
        <div
          className="w-full border border-slate-600 p-2 flex items-center text-white bg-[#3371BC] hover:bg-[#2C63A0] active:bg-[#1E4D80] overflow-hidden justify-center font-bold text-sm cursor-pointer space-x-2"
          onClick={handleDownload}
        >
          Download
        </div>
      </div>
    </div>
  );
  return (
    <div className="space-y-5 h-full">
      <div className="flex space-x-4">
        {currentStep !== 1 && (
          <FaChevronLeft
            className="cursor-pointer"
            onClick={() => {
              setCurrentStep(1);
            }}
          />
        )}
        {Mark}
      </div>
      <div className="w-full border-t border-white-500 my-5" />
      {currentStep===1 && children}
      <div
        className="w-full h-full rounded-2xl bg-[#262732] p-5 text-2xl	space-y-4"
        style={{ height: 'calc(100% - 110px)' }}
      >
        {currentStep === 1 && stepOne}
        {currentStep === 2 && stepTwo}
        <AskModal isOpen={modalIsOpen} onOk={handleOk} onClose={handleClose} />
      </div>
    </div>
  );
};
const OtherDocComponent: FunctionComponent<DocComponentProps> = ({
  children,
}) => {
  const [engDocUploaded, setEngDocUploaded] = useState<boolean>(false);
  const [chDocUploaded, setChDocUploaded] = useState<boolean>(false);
  return (
    <div className="w-full h-full rounded-2xl bg-[#262732] p-5 text-2xl	space-y-4">
      <div>Upload 1 English document and 1 Chinese document</div>
      <div
        className="flex justify-evenly w-full"
        style={{ height: 'calc(100% - 160px)' }}
      >
        <div className="w-1/2 p-1">
          <DocumentUploadComponent
            mode="Other English"
            isUploaded={engDocUploaded}
            setIsUploaded={setEngDocUploaded}
          ></DocumentUploadComponent>
        </div>
        <div className="w-1/2 p-1">
          <DocumentUploadComponent
            mode="Other Chinese"
            isUploaded={chDocUploaded}
            setIsUploaded={setChDocUploaded}
          ></DocumentUploadComponent>
        </div>
      </div>
      <div className="w-full h-24 bg-[#1B1D2A] rounded flex justify-end p-5 font-bold">
        <button className="bg-[#306BF3] border-solid border border-[#252637]">
          Review
        </button>
      </div>
    </div>
  );
};

export default function ReviewPage() {
  const app = useContext(AppContext);
  const appName = 'Review Translation';

  const isShow = app?.currentPage === appName ? '' : 'hidden';
  const mWidth = app?.showMenu ? '50vw' : '50vw - 256px';

  const DocumentTypes = [
    '2 KFS Documents',
    'Single KFS Document',
    // 'Other Document',
  ];
  const [docType, setDocType] = useState<string>(DocumentTypes[0]);

  const handleDocTypeChange = (newDocType: string) => {
    setDocType(newDocType);
  };
  return (
    <div className={`${isShow} p-8 pb-2 h-full w-full`}>
      {docType === DocumentTypes[0] && (
        <KFS2DocComponent>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
            idx={0}
          ></DocumentTypeSelector>
        </KFS2DocComponent>
      )}
      {docType === DocumentTypes[1] && (
        <KFS1DocComponent>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
            idx={1}
          ></DocumentTypeSelector>
        </KFS1DocComponent>
      )}
      {/* {docType === DocumentTypes[2] && (
        <OtherDocComponent>
          <DocumentTypeSelector
            options={DocumentTypes}
            changeDocType={handleDocTypeChange}
          ></DocumentTypeSelector>
        </OtherDocComponent>
      )} */}
    </div>
  );
}
