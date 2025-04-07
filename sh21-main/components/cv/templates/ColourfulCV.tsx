import {
  Page,
  Text,
  StyleSheet,
  Document,
  View,
  Font,
} from "@react-pdf/renderer";
import { FC } from "react";
import { ItemInterface } from "react-sortablejs";

// Colourful CV is now referred to as Modern CV on the buttons

//One of the CV Options used by react-pdf to render the CV for viewing or saving

interface props {
  CV: CV;
  order?: ItemInterface[];
}

Font.register({
  family: "Quicksand",
  src: "http://fonts.gstatic.com/s/quicksand/v30/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf",
});

let ColourfulCV: FC<props> = ({ CV, order }) => {
  const pdfstyles = StyleSheet.create({
    name: {
      fontSize: 35,
      marginTop: 25,
      marginBottom: 10,
      textAlign: "center",
      fontFamily: "Quicksand",
    },
    sectionTitle: {
      fontSize: 17,
      marginLeft: 25,
      marginBottom: 5,
      fontFamily: "Quicksand",
    },
    regText: {
      fontSize: 12,
      marginHorizontal: 25,
      marginBottom: 10,
      fontFamily: "Quicksand",
    },
    subtitle: {
      fontSize: 15,
      marginBottom: 5,
      textAlign: "center",
      fontFamily: "Quicksand",
    },
    flexrowview: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    flexcolview: {
      flexDirection: "column",
    },
    skillsView: {
      width: "50%",
    },
    text: {
      fontSize: 14,
      marginHorizontal: 25,
      marginBottom: 5,
      fontFamily: "Quicksand",
    },
    rightText: {
      fontSize: 14,
      marginHorizontal: 25,
      marginBottom: 5,
      fontFamily: "Quicksand",
      textAlign: "right",
    },
    line: {
      marginHorizontal: 25,
      marginTop: 5,
      height: "1.5pt",
      backgroundColor: "#696969",
    },
  });

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  //Format Dates
  function dateFormat(
    startDate: Date | string | null,
    endDate: Date | null | string
  ) {
    if (!startDate) {
      return "";
    }
    const startDateNew = new Date(startDate);

    return (
      months[startDateNew.getMonth()] +
      " " +
      startDateNew.getFullYear() +
      " - " +
      (endDate
        ? months[new Date(endDate).getMonth()] +
          " " +
          new Date(endDate).getFullYear()
        : "Present")
    );
  }

  //Personal Statement Section
  const ps = (
    <View>
      {CV.personalStatement != "" ? (
        <>
          <Text style={pdfstyles.line}></Text>
          <Text style={pdfstyles.sectionTitle}>SUMMARY</Text>
          <Text style={pdfstyles.regText}>{CV.personalStatement}</Text>
        </>
      ) : (
        ""
      )}
    </View>
  );

  //Education Section
  const ed = (
    <View>
      {CV.education.length > 0 ? (
        <>
          <Text style={pdfstyles.line}></Text>
          <Text style={pdfstyles.sectionTitle}>EDUCATION</Text>
          {CV.education.map((each, i) => {
            return (
              <div key={i}>
                <View style={pdfstyles.flexrowview}>
                  <Text style={pdfstyles.text}>{each.name}</Text>
                  <Text style={pdfstyles.rightText}>
                    {" " + dateFormat(each.startDate, each?.endDate)}
                  </Text>
                </View>
                <Text style={pdfstyles.text}>{each.degreeClassification}</Text>
                <Text style={pdfstyles.regText}>{each.description}</Text>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </View>
  );

  //Experience Section
  const exp = (
    <View>
      {CV.experience.length > 0 ? (
        <>
          <Text style={pdfstyles.line}></Text>
          <Text style={pdfstyles.sectionTitle}>EXPERIENCE</Text>
          {CV.experience.map((each, i) => {
            return (
              <div key={i}>
                <View style={pdfstyles.flexrowview}>
                  <Text style={pdfstyles.text}>{each.name}</Text>
                  <Text style={pdfstyles.rightText}>
                    {" " + dateFormat(each.startDate, each?.endDate)}
                  </Text>
                </View>
                <Text style={pdfstyles.text}>{each.jobTitle}</Text>
                <Text style={pdfstyles.regText}>{each.description}</Text>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </View>
  );

  //References section
  const refs = (
    <View>
      {CV.refs.length != 0 ? (
        <>
          <Text style={pdfstyles.line}></Text>
          <Text style={pdfstyles.sectionTitle}>REFERENCES</Text>
          {CV.refs.map((each, i) => {
            return (
              <div key={i}>
                <Text style={pdfstyles.text}>
                  {each.refereeName + " - " + each.refereeContact}
                </Text>

                <Text style={pdfstyles.regText}>{each.reference}</Text>
              </div>
            );
          })}
        </>
      ) : (
        <Text style={pdfstyles.regText}>References available on request</Text>
      )}
    </View>
  );

  //Skills section
  const skills = (
    <View>
      {CV.qualities.length != 0 || CV.skills.length != 0 ? (
        <>
          <View style={pdfstyles.flexrowview}>
            {CV.qualities.length != 0 ? (
              <>
                <View style={pdfstyles.skillsView}>
                  <View style={pdfstyles.flexcolview}>
                    <Text style={pdfstyles.line}></Text>
                    <Text style={pdfstyles.sectionTitle}>SOFT SKILLS</Text>
                    {CV.qualities.map((each, i) => {
                      return (
                        <Text key={i} style={pdfstyles.regText}>
                          {"\u2022  " + each}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              ""
            )}
            {CV.skills.length != 0 ? (
              <>
                <View style={pdfstyles.skillsView}>
                  <View style={pdfstyles.flexcolview}>
                    <Text style={pdfstyles.line}></Text>
                    <Text style={pdfstyles.sectionTitle}>HARD SKILLS</Text>
                    {CV.skills.map((each, i) => {
                      return (
                        <Text key={i} style={pdfstyles.regText}>
                          {"\u2022  " + each}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              ""
            )}
          </View>
        </>
      ) : (
        ""
      )}
    </View>
  );

  //Arrange the sections of the CV in an array
  const content = [ps, ed, exp, skills, refs];


  //Return the content in the given order.
  return (
    <Document>
      <Page size="A4">
        <Text style={pdfstyles.name}>
          {CV.fname.toUpperCase() + " " + CV.sname.toUpperCase()}
        </Text>
        <Text style={pdfstyles.subtitle}>{CV.email + " • " + CV.number}</Text>

        {order?.map((e) => {
          return content[(e.id as number) - 1];
        })}
      </Page>
    </Document>
  );
};

export default ColourfulCV;
