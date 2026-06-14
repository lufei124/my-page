import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  Collapse,
  Divider,
  Input,
  Modal,
  Phone,
  Title,
} from 'animal-island-ui';
import { SEOHead } from '@/components/seo/SEOHead';
import { siteConfig } from '@/lib/site';
import { faqItems } from '@/lib/constants';
import styles from './AboutPage.module.css';

interface FormValues {
  name: string;
  email: string;
  message: string;
}

export default function AboutPage() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(() => {
    setOpen(true);
    reset();
  });

  return (
    <>
      <SEOHead
        title="关于"
        description={`${siteConfig.author.bio} — 欢迎联系`}
        path="/about"
      />
      <div className={styles.layout}>
        <section className={styles.main}>
          <Title size="large" color="app-green">
            关于我
          </Title>
          <Divider type="wave-yellow" />
          <Card color="default">
            <p className={styles.bio}>{siteConfig.author.bio}</p>
            <a href={siteConfig.resumeUrl} download>
              <Button type="primary">下载简历</Button>
            </a>
          </Card>

          <Title size="middle" color="app-orange">
            联系我
          </Title>
          <Divider type="line-brown" />
          <Card color="app-teal" className={styles.contactCard}>
            <p className={styles.hint}>
              邮箱：
              <a href={siteConfig.social.email}>{siteConfig.author.email}</a>
            </p>
            <form onSubmit={onSubmit} className={styles.form} noValidate>
              <label htmlFor="name">姓名</label>
              <Input
                id="name"
                placeholder="你的名字"
                status={errors.name ? 'error' : undefined}
                {...register('name', { required: '请输入姓名' })}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}

              <label htmlFor="email">邮箱</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                status={errors.email ? 'error' : undefined}
                {...register('email', {
                  required: '请输入邮箱',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '请输入有效邮箱',
                  },
                })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}

              <label htmlFor="message">消息</label>
              <Input
                id="message"
                placeholder="想说的话…"
                status={errors.message ? 'error' : undefined}
                {...register('message', {
                  required: '请输入消息',
                  minLength: { value: 10, message: '消息至少 10 个字符' },
                })}
              />
              {errors.message && (
                <span className={styles.error}>{errors.message.message}</span>
              )}

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting}
              >
                发送消息
              </Button>
            </form>
          </Card>

          <Title size="middle" color="app-teal">
            常见问题
          </Title>
          {faqItems.map((item) => (
            <Collapse
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </section>
        <aside className={styles.aside} aria-hidden="true">
          <Phone />
        </aside>
      </div>

      <Modal
        open={open}
        title="消息已收到"
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        typewriter
      >
        谢谢你的留言！我会尽快通过邮箱回复你。
      </Modal>
    </>
  );
}
