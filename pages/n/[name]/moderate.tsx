import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import ReportService from '../../../util/requests/ReportService';
import Report from '../../../models/Report';
import Navbar from '../../../components/molecules/Navbar';
import TabSelector from '../../../components/molecules/TabSelector';
import ModerationPanel from '../../../components/organism/ModerationPanel';

const SubnigditModerationPanelPage: NextPage = () => {
    const [selected, setSelected] = useState<number>(0);
    const type = ['post', 'comment', 'reply']
    const reportService = new ReportService();
    const [reports, setReports] = useState<Report[]>([]);


    // TODO change first argument to subnigdit id
    useEffect(() => {
        reportService.getAll({type: type[selected], subnigditId: 1 }).then((res) => {
            setReports(res ? res : []);
        })
    }, [selected])

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
      <Navbar/>
      <TabSelector selected={selected} setSelected={setSelected} tabs={['Posts', 'Comments', 'Replies']}/>
      <ModerationPanel tab={selected} className={"h-screen"} reports={reports} onBanUser={onBanUser} onDeleteContent={onDeleteContent} onDismissReport={onDismissReport}/>
    </div>
  )
}

export default SubnigditModerationPanelPage
