import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TabSelector from '../../../components/molecules/TabSelector';
import ModerationPanel from '../../../components/organism/ModerationPanel';
import Report from '../../../models/Report';
import ReportService from '../../../util/requests/ReportService';
import SubnigditService from '../../../util/requests/SubnigditService';

const type = ['post', 'comment', 'reply']

const SubnigditModerationPanelPage: NextPage = () => {
    const [selected, setSelected] = useState<number>(0);
    const reportService = new ReportService();
    const [reports, setReports] = useState<Report[]>([]);
    const subnigditService = new SubnigditService();

    const router = useRouter();
    const name = router.query.name as string;

    // TODO change first argument to subnigdit id
    useEffect(() => {
        const f = async () => {
          if(!name) return;
          const subId = await subnigditService.getBySlug(name).then(res => res[0]?.id)
          if(!subId) return;
          await reportService.getAll({type: type[selected], subnigditId: subId }).then((res) => {
            setReports(res ? res : []);
        })
        }
        f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, name])

    const newReports = async () => {
        const res = await reportService.getAll({type: type[selected], toNigdit: true});
        setReports(res ? res : []);
    }
    const onBanUser = async (report: Report) => {
        await reportService.banUser(report.id, true);
        await newReports();
    }
    const onDeleteContent = async (report: Report) => {
        await reportService.deleteContent(report.id);
        await newReports();
    }
    const onDismissReport = async (report: Report) => {
        await reportService.delete(report.id);
        await newReports();
    }

  return (
    <div className='bg-backgroundL dark:bg-backgroundD h-full'>
      <Head>
        <title>Subnigdit moderation page</title>
        <link rel="icon" href={'/nigditLogo.svg'}/>
        <meta name="description" content="Subnigdit moderation page."/>
      </Head>
      <TabSelector selected={selected} setSelected={setSelected} tabs={['Posts', 'Comments', 'Replies']}/>
      <ModerationPanel tab={selected} className={"h-screen"} reports={reports} onBanUser={onBanUser} onDeleteContent={onDeleteContent} onDismissReport={onDismissReport}/>
    </div>
  )
}

export default SubnigditModerationPanelPage
